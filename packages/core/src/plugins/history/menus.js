import React, { PureComponent } from "react";
import { undo, redo } from "prosemirror-history";

import { Button, Icons, ButtonSeparator } from "nib-ui";

class HistoryMenu extends PureComponent {
  undo = () => {
    const { state, dispatch } = this.props.view;
    undo(state, dispatch);
  };

  redo = () => {
    const { state, dispatch } = this.props.view;
    redo(state, dispatch);
  };

  render() {
    return (
      <>
        <Button onClick={this.undo}>
          <Icons.Undo />
        </Button>
        <ButtonSeparator />
        <Button onClick={this.redo}>
          <Icons.Redo />
        </Button>
      </>
    );
  }
}

export default HistoryMenu;
