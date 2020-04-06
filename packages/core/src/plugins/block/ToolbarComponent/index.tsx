import * as React from 'react';
import { setBlockType } from 'prosemirror-commands';

import { PMStateConsumer } from '../../../context/pm-state';
import { ConfigContextConsumer } from '../../../context/config';
import { blockPluginKey } from '../plugin';
import options from '../blockData';
import Grouped from './Grouped';
import Ungrouped from './Ungrouped';
import { ProsemirrorEditorState } from '../../../types/prosemirror';
import { KeyValueType } from '../../../types/common';

interface ToolbarComponentProps {
  pmstate: ProsemirrorEditorState;
  config: { options: string; grouped: boolean };
}

const ToolbarComponent = (props: ToolbarComponentProps) => {
  const changeBlockType = (blockType: string) => {
    let attrs;
    let blockName;
    if (blockType === 'paragraph') {
      blockName = blockType;
    } else {
      attrs = { level: blockType.split('-')[1] };
      blockName = 'heading';
    }

    const { pmstate } = props;
    const { pmview } = pmstate;
    const { state, dispatch } = pmview;
    const nodeType = state.schema.nodes[blockName];

    setBlockType(nodeType, attrs)(state, dispatch);
    pmview.focus();
  };

  const getSelectedBlock = () => {
    const { pmstate } = props;
    const { pmview } = pmstate;
    if (!pmview) return undefined;

    const { state } = pmview;
    const pluginState = blockPluginKey.getState(state);
    const selectedBlock = pluginState && pluginState.selectedBlock;
    if (selectedBlock) {
      const { type, attrs } = selectedBlock;
      if (attrs && attrs.level) return `${type}-${attrs.level}`;
      return type;
    }
    return undefined;
  };

  const { config } = props;
  const { grouped, options: toolbarOptions } = config;
  let filteredOptions = options;
  if (toolbarOptions) {
    filteredOptions = options.filter(
      (opt) => toolbarOptions.indexOf(opt.value.tag) >= 0
    );
  }

  if (grouped !== false) {
    return (
      <Grouped
        onChange={changeBlockType}
        selectedBlockType={getSelectedBlock()}
        options={filteredOptions}
      />
    );
  }

  return (
    <Ungrouped
      onChange={changeBlockType}
      selectedBlockType={getSelectedBlock()}
      options={filteredOptions}
    />
  );
};

export default (props: KeyValueType) => (
  <ConfigContextConsumer>
    {({ config }) => (
      <PMStateConsumer>
        {({ pmstate }) => {
          if (!pmstate) return null;
          return (
            <ToolbarComponent config={config} pmstate={pmstate} {...props} />
          );
        }}
      </PMStateConsumer>
    )}
  </ConfigContextConsumer>
);
