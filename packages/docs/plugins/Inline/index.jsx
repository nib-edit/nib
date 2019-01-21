import React from "react";
import Editor from "nib-core";

/**
 * @visibleName 2. Inline
 */
const InlinePlugin = () => (
  <Editor
    config={{
      plugins: { options: "inline" },
      toolbar: {
        options: "top",
        top: { options: "inline" }
      }
    }}
  />
);

export default InlinePlugin;
