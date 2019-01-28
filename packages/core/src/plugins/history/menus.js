import React, { PureComponent } from "react";
import { undo, redo } from "prosemirror-history";

import { MenuButton, Icons, Separator } from "nib-ui";

export default class HistoryMenu extends PureComponent {
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
        <MenuButton onClick={this.undo}>
          <Icons.Undo />
        </MenuButton>
        <Separator />
        <MenuButton onClick={this.redo}>
          <Icons.Redo />
        </MenuButton>
      </>
    );
  }
}
