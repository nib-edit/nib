import React, { PureComponent } from "react";
import { undo, redo } from "prosemirror-history";

import { ToolbarButton, Icon, Separator } from "nib-ui";

import { formatKeymap } from "../../common/utils/key-format";
import { KeymapInfo } from "./keymaps";

class HistoryToolbarComponent extends PureComponent {
  undo = () => {
    const { state, dispatch } = this.props.appParams.view;
    undo(state, dispatch);
  };

  redo = () => {
    const { state, dispatch } = this.props.appParams.view;
    redo(state, dispatch);
  };

  render() {
    return (
      <>
        <ToolbarButton
          onClick={this.undo}
          title={formatKeymap(KeymapInfo.undo)}
        >
          <Icon name="Undo" />
        </ToolbarButton>
        <Separator type="toolbar" />
        <ToolbarButton
          onClick={this.redo}
          title={formatKeymap(KeymapInfo.redo)}
        >
          <Icon name="Redo" />
        </ToolbarButton>
      </>
    );
  }
}

export default HistoryToolbarComponent;
