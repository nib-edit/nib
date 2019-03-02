import React, { PureComponent } from "react";
import { ToolbarButton, Icons } from "nib-ui";

class TableToolbarComponent extends PureComponent {
  insertTable = () => {};

  render() {
    return (
      <ToolbarButton name="table" onClick={this.insertTable}>
        <Icons.Table />
      </ToolbarButton>
    );
  }
}

export default TableToolbarComponent;
