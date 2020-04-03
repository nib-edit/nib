import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { setBlockType } from 'prosemirror-commands';

import { PMStateConsumer } from '../../../context/pm-state';
import { ConfigContextConsumer } from '../../../context/config';
import { blockPluginKey } from '../plugin';
import options from '../blockData';
import Grouped from './Grouped';
import Ungrouped from './Ungrouped';

class ToolbarComponent extends PureComponent {
  changeBlockType = blockType => {
    let attrs;
    let blockName;
    if (blockType === 'paragraph') {
      blockName = blockType;
    } else {
      attrs = { level: blockType.split('-')[1] };
      blockName = 'heading';
    }

    const { pmstate } = this.props;
    const { pmview } = pmstate;
    const { state, dispatch } = pmview;
    const nodeType = state.schema.nodes[blockName];

    setBlockType(nodeType, attrs)(state, dispatch);
    pmview.focus();
  };

  getSelectedBlock = () => {
    const { pmstate } = this.props;
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

  render() {
    const { config } = this.props;
    const { grouped, options: toolbarOptions } = config;
    let filteredOptions = options;
    if (toolbarOptions) {
      filteredOptions = options.filter(
        opt => toolbarOptions.indexOf(opt.value.tag) >= 0
      );
    }

    if (grouped !== false) {
      return (
        <Grouped
          onChange={this.changeBlockType}
          selectedBlockType={this.getSelectedBlock()}
          options={filteredOptions}
        />
      );
    }

    return (
      <Ungrouped
        onChange={this.changeBlockType}
        selectedBlockType={this.getSelectedBlock()}
        options={filteredOptions}
      />
    );
  }
}

ToolbarComponent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  config: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pmstate: PropTypes.object.isRequired,
};

export default props => (
  <ConfigContextConsumer>
    {({ config }) => (
      <PMStateConsumer>
        {({ pmstate }) => (
          <ToolbarComponent config={config} pmstate={pmstate} {...props} />
        )}
      </PMStateConsumer>
    )}
  </ConfigContextConsumer>
);
