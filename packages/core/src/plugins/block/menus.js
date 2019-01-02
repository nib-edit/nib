import React, { PureComponent } from "react";
import { Select } from "nib-ui";
import { setBlockType } from "prosemirror-commands";

import { blockPluginKey } from "./plugins";
import { blockData as options } from "./blockData";

class BlockMenu extends PureComponent {
  changeBlockType = option => {
    let attrs;
    const value = option.value;
    let blockName = value.blockType;
    if (value.blockType !== "paragraph") {
      attrs = { level: value.blockType.split("-")[1] };
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
    const selectedBlockType = this.getSelectedBlock();
    let selectedOption;
    if (selectedBlockType) {
      selectedOption = options[selectedBlockType];
    } else {
      selectedOption = { value: undefined, label: "Other" };
    }
    return (
      <Select
        onChange={this.changeBlockType}
        selectedOption={selectedOption}
        options={Object.values(options)}
      />
    );
  }
}

export default BlockMenu;

// todo: add option for display of options in buttons and not dropdown
