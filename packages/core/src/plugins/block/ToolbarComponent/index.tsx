import * as React from 'react';
import { setBlockType } from 'prosemirror-commands';

import { usePMStateContext } from '../../../context/pm-state/index';

import Grouped from './Grouped';
import Ungrouped from './Ungrouped';
import options from '../blockData';
import { blockPluginKey } from '../plugin';

export interface ToolbarComponentProps {
  config: { options: string; grouped: boolean };
}

export default (props: ToolbarComponentProps) => {
  const { pmstate } = usePMStateContext();
  if (!pmstate) return null;
  const { pmview } = pmstate;
  if (!pmview) return null;

  const changeBlockType = (blockType: string) => {
    let attrs;
    let blockName;
    if (blockType === 'paragraph') {
      blockName = blockType;
    } else {
      attrs = { level: blockType.split('-')[1] };
      blockName = 'heading';
    }

    const { state, dispatch } = pmview;
    const nodeType = state.schema.nodes[blockName];

    setBlockType(nodeType, attrs)(state, dispatch);
    pmview.focus();
  };

  const getSelectedBlock = () => {
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
