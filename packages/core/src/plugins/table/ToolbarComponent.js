import React, { PureComponent } from "react";
import { ToolbarButton, Icons } from "nib-ui";

import { createTable } from "./commands";

class TableToolbarComponent extends PureComponent {
  insertTable = () => {
    const { view } = this.props.app_params;
    const { state, dispatch } = view;
    createTable(state, dispatch);
  };

  render() {
    return (
      <ToolbarButton name="table" onClick={this.insertTable} title="Table">
        <Icons.Table />
      </ToolbarButton>
    );
  }
}

export default TableToolbarComponent;
