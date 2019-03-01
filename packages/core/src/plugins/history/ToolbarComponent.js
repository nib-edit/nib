import React, { PureComponent } from "react";
import { undo, redo } from "prosemirror-history";

import { ToolbarButton, Icons, Separator } from "nib-ui";

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
        <ToolbarButton onClick={this.undo}>
          <Icons.Undo />
        </ToolbarButton>
        <Separator type="toolbar" />
        <ToolbarButton onClick={this.redo}>
          <Icons.Redo />
        </ToolbarButton>
      </>
    );
  }
}

export default HistoryToolbarComponent;
