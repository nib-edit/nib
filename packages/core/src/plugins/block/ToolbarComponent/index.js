import React, { PureComponent } from "react";
import { setBlockType } from "prosemirror-commands";

import { blockPluginKey } from "../plugin";
import { blockData as options } from "../blockData";
import Grouped from "./Grouped";
import Ungrouped from "./Ungrouped";

export default class BlockToolbarComponent extends PureComponent {
  changeBlockType = blockType => {
    let attrs;
    let blockName;
    if (blockType === "paragraph") {
      blockName = blockType;
    } else {
      attrs = { level: blockType.split("-")[1] };
      blockName = "heading";
    }
    const { view: { state, dispatch } = {} } = this.props.app_params;
    const nodeType = state.schema.nodes[blockName];
    setBlockType(nodeType, attrs)(state, dispatch);
  };

  getSelectedBlock = () => {
    const { view: { state } = {} } = this.props.app_params;
    if (!state) return;
    const pluginState = blockPluginKey.getState(state);
    const selectedBlock = pluginState && pluginState.selectedBlock;
    if (selectedBlock) {
      const { type, attrs } = selectedBlock;
      if (attrs && attrs.level) return `${type}-${attrs.level}`;
      return type;
    }
  };

  componentWillReceiveProps(props) {}
  render() {
    const { config: { grouped, options: toolbarOptions } = {} } = this.props;
    let filteredOptions = options;
    if (toolbarOptions) {
      filteredOptions = options.filter(
        opt => toolbarOptions.indexOf(opt.name) >= 0
      );
    }
    if (grouped) {
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
