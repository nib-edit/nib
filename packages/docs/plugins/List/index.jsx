import React from "react";
import Editor from "nib-core";

/**
 * @visibleName 5. List
 */
const ListPlugin = () => (
  <Editor
    config={{
      plugins: { options: "list" },
      toolbar: {
        options: "top",
        top: { options: "list" }
      }
    }}
  />
);

export default ListPlugin;
