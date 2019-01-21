import React from "react";
import Editor from "nib-core";

/**
 * @visibleName 3. History
 */
const HistoryPlugin = () => (
  <Editor
    config={{
      plugins: { options: "" },
      toolbar: {
        options: "top",
        top: { options: "history" }
      }
    }}
  />
);

export default HistoryPlugin;
