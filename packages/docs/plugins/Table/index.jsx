import React from "react";
import Editor from "nib-core";

/**
 * @visibleName 8. Table
 */
const TablePluginDemo = ({grouped}) => (
  <Editor
    config={{
      plugins: {options: "table"},
      toolbar: {
        options: "top",
        top: {
          options: "table"
        }
      }
    }}
  />
);

export default TablePluginDemo;
