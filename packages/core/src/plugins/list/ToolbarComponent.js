import React, { PureComponent } from "react";
import { ToolbarButton, Icon, Separator } from "nib-ui";
import { toggleListCmd } from "./commands";

import { formatKeymap } from "../../common/utils/key-format";
import { KeymapInfo } from "./keymaps";
import { listPluginKey } from "./plugin";

class ListToolbarComponent extends PureComponent {
  toggleList = evt => {
    const listType = evt.currentTarget.getAttribute("name");
    const { view } = this.props.appParams;
    toggleListCmd(view, listType);
  };

  getSelectedListType = () => {
    const { view: { state } = {} } = this.props.appParams;
    if (!state) return;
    const pluginState = listPluginKey.getState(state);
    const selectedListType = pluginState && pluginState.selectedListType;
    return selectedListType && selectedListType.name;
  };

  render() {
    const selectedListType = this.getSelectedListType();
    const bulletListActive = selectedListType === "bulletList";
    const orderedListActive = selectedListType === "orderedList";
    return (
      <>
        <ToolbarButton
          name="bulletList"
          onClick={this.toggleList}
          selected={bulletListActive}
          title={formatKeymap(KeymapInfo.bulletList)}
        >
          <Icon name="ListBulleted" selected={bulletListActive} />
        </ToolbarButton>
        <Separator type="toolbar" />
        <ToolbarButton
          name="orderedList"
          onClick={this.toggleList}
          selected={orderedListActive}
          title={formatKeymap(KeymapInfo.orderedList)}
        >
          <Icon name="ListNumbered" selected={orderedListActive} />
        </ToolbarButton>
      </>
    );
  }
}

export default ListToolbarComponent;
