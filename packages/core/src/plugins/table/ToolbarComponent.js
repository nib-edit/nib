import React, { PureComponent } from "react";
import { ToolbarButton, Icon } from "nib-ui";

import { createTable } from "./commands";

class TableToolbarComponent extends PureComponent {
  insertTable = () => {
    const { view } = this.props.appParams;
    const { state, dispatch } = view;
    createTable(state, dispatch);
  };

  render() {
    return (
      <ToolbarButton name="table" onClick={this.insertTable} title="Table">
        <Icon name="Table" />
      </ToolbarButton>
    );
  }
}

export default TableToolbarComponent;
