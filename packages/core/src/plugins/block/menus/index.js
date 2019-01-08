import React, { PureComponent } from "react";
import { setBlockType } from "prosemirror-commands";

import { blockPluginKey } from "../plugins";
import { blockData as options } from "../blockData";
import Grouped from "./Grouped";
import Ungrouped from "./Ungrouped";

class BlockMenu extends PureComponent {
  changeBlockType = blockType => {
    let attrs;
    let blockName;
    if (blockType === "paragraph") {
      blockName = blockType;
    } else {
      attrs = { level: blockType.split("-")[1] };
      blockName = "heading";
    }
    const { view: { state, dispatch } = {} } = this.props;
    const nodeType = state.schema.nodes[blockName];
    setBlockType(nodeType, attrs)(state, dispatch);
  };

  getSelectedBlock = () => {
    const { view: { state } = {} } = this.props;
    if (!state) return;
    const pluginState = blockPluginKey.getState(state);
    const selectedBlock = pluginState && pluginState.selectedBlock;
    if (selectedBlock) {
      const { type, attrs } = selectedBlock;
      if (attrs && attrs.level) return `${type}-${attrs.level}`;
      return type;
    }
  };

  render() {
    const { config: { grouped, options: menuOptions } = {} } = this.props;
    let filteredOptions = options;
    if (menuOptions) {
      filteredOptions = options.filter(
        opt => menuOptions.indexOf(opt.name) >= 0
      );
    }
    if (grouped == false) {
      return (
        <Ungrouped
          onChange={this.changeBlockType}
          selectedBlockType={this.getSelectedBlock()}
          options={filteredOptions}
        />
      );
    }
    return (
      <Grouped
        onChange={this.changeBlockType}
        selectedBlockType={this.getSelectedBlock()}
        options={filteredOptions}
      />
    );
  }
}

export default BlockMenu;
