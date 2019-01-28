import React, { PureComponent } from "react";
import { MenuButton, Icons, Separator } from "nib-ui";
import { toggleListCmd } from "./commands";

import { listPluginKey } from "./plugins";

export default class ListMenu extends PureComponent {
  toggleList = evt => {
    const listType = evt.currentTarget.getAttribute("name");
    const { view } = this.props.app_params;
    toggleListCmd(view, listType);
  };

  getSelectedListType = () => {
    const { view: { state } = {} } = this.props.app_params;
    if (!state) return;
    const pluginState = listPluginKey.getState(state);
    const selectedListType = pluginState && pluginState.selectedListType;
    return selectedListType && selectedListType.name;
  };

  render() {
    const selectedListType = this.getSelectedListType();
    return (
      <>
        <MenuButton
          name="bulletList"
          onClick={this.toggleList}
          selected={selectedListType === "bulletList"}
        >
          <Icons.ListBulleted />
        </MenuButton>
        <Separator />
        <MenuButton
          name="orderedList"
          onClick={this.toggleList}
          selected={selectedListType === "orderedList"}
        >
          <Icons.ListNumbered />
        </MenuButton>
      </>
    );
  }
}
