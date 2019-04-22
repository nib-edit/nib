import React from "react";
import Editor from "nib-core";

/**
 * @visibleName 2. Help
 */
const HelpPlugin = () => (
  <Editor
    config={{
      plugins: {options: "help"},
      toolbar: {
        options: "top",
        top: {options: "help"}
      }
    }}
  />
);

export default HelpPlugin;
