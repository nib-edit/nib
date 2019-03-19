import React, { PureComponent } from "react";
import { ToolbarButton, Icons, Separator } from "nib-ui";
import { toggleListCmd } from "./commands";

import { formatKeymap } from "../../common/utils/key-format";
import { KeymapInfo } from "./keymaps";
import { listPluginKey } from "./plugin";

class ListToolbarComponent extends PureComponent {
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
        <ToolbarButton
          name="bulletList"
          onClick={this.toggleList}
          selected={selectedListType === "bulletList"}
          title={formatKeymap(KeymapInfo.bulletList)}
        >
          <Icons.ListBulleted />
        </ToolbarButton>
        <Separator type="toolbar" />
        <ToolbarButton
          name="orderedList"
          onClick={this.toggleList}
          selected={selectedListType === "orderedList"}
          title={formatKeymap(KeymapInfo.orderedList)}
        >
          <Icons.ListNumbered />
        </ToolbarButton>
      </>
    );
  }
}

export default ListToolbarComponent;
