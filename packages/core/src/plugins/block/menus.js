import React, { PureComponent } from "react";
import { Select } from "nib-ui";
import { setBlockType } from "prosemirror-commands";

import { blockPluginKey } from "./plugins";
import { blockData as options } from "./blockData";

class BlockMenu extends PureComponent {
  changeBlockType = value => {
    let attrs;
    let blockName = value;
    if (value !== "paragraph") {
      attrs = { level: value.split("-")[1] };
      blockName = "heading";
    }
    const { view: { state: editorState, dispatch } = {} } = this.props;
    const nodeType = editorState.schema.nodes[blockName];
    setBlockType(nodeType, attrs)(editorState, dispatch);
  };

  getSelectedBlock = () => {
    const { view: { state: editorState } = {} } = this.props;
    if (!editorState) return;
    const pluginState = blockPluginKey.getState(editorState);
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

export default [BlockMenu];

// future: add option for display of options in buttons and not dropdown
