import React from "react";
import Editor from "nib-core";

/**
 * @visibleName 4. Link
 */
const LinkPlugin = () => (
  <Editor
    config={{
      plugins: { options: "link" },
      toolbar: {
        options: "top",
        top: { options: "link" }
      }
    }}
  />
);

export default LinkPlugin;

// todo: shortcut to unlink to be added
