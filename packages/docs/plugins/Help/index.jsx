import React from "react";
import Editor from "nib-core";

/**
 * @visibleName 8. Help
 */
const HelpPlugin = () => (
  <Editor
    config={{
      plugins: { options: "help" },
      toolbar: {
        options: "top",
        top: { options: "help" }
      }
    }}
  />
);

export default HelpPlugin;
