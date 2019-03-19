import React, { PureComponent } from "react";
import { undo, redo } from "prosemirror-history";

import { ToolbarButton, Icons, Separator } from "nib-ui";

import { formatKeymap } from "../../common/utils/key-format";
import { KeymapInfo } from "./keymaps";

class HistoryToolbarComponent extends PureComponent {
  undo = () => {
    const { state, dispatch } = this.props.app_params.view;
    undo(state, dispatch);
  };

  redo = () => {
    const { state, dispatch } = this.props.app_params.view;
    redo(state, dispatch);
  };

  render() {
    return (
      <>
        <ToolbarButton
          onClick={this.undo}
          title={formatKeymap(KeymapInfo.undo)}
        >
          <Icons.Undo />
        </ToolbarButton>
        <Separator type="toolbar" />
        <ToolbarButton
          onClick={this.redo}
          title={formatKeymap(KeymapInfo.redo)}
        >
          <Icons.Redo />
        </ToolbarButton>
      </>
    );
  }
}

export default HistoryToolbarComponent;
