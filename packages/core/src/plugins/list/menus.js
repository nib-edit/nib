import React, { PureComponent } from "react";
import { toggleListCmd } from "./commands";
import { Button, Icons, ButtonSeparator } from "nib-ui";

import { listPluginKey } from "./plugins";

class ListMenu extends PureComponent {
  toggleList = evt => {
    const listType = evt.currentTarget.getAttribute("name");
    const { view } = this.props;
    toggleListCmd(view, listType);
  };

  getSelectedListType = () => {
    const { view: { state: editorState } = {} } = this.props;
    if (!editorState) return;
    const pluginState = listPluginKey.getState(editorState);
    const selectedListType = pluginState && pluginState.selectedListType;
    return selectedListType && selectedListType.name;
  };

  render() {
    const selectedListType = this.getSelectedListType();
    return (
      <>
        <Button
          name="bulletList"
          onClick={this.toggleList}
          selected={selectedListType === "bulletList"}
        >
          <Icons.ListBulleted />
        </Button>
        <ButtonSeparator />
        <Button
          name="orderedList"
          onClick={this.toggleList}
          selected={selectedListType === "orderedList"}
        >
          <Icons.ListNumbered />
        </Button>
      </>
    );
  }
}

export default [ListMenu];
