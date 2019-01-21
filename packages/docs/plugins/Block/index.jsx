import React from "react";
import Editor from "nib-core";

/**
 * @visibleName 1. Block
 */
const BlockPlugin = ({ grouped }) => (
  <Editor
    config={{
      plugins: { options: "block" },
      toolbar: {
        options: "top",
        top: {
          options: "block",
          block: { grouped }
        }
      }
    }}
  />
);

export default BlockPlugin;
