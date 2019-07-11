import React, { useState } from "react";
import Editor from "nib-core";

import defaultValue from "./sampleData";

/**
 * @visibleName 2. Block inline
 */
const BlockInline = () => {
  const [content, setContent] = useState();
  return (
    <div>
      <Editor
        config={{
          plugins: { options: "block inline list" },
          toolbar: { options: "top", top: { options: "block inline list" } }
        }}
        onChange={setContent}
        defaultValue={defaultValue}
      />
      <pre>{JSON.stringify(content || defaultValue, null, 4)}</pre>
    </div>
  );
};

export default BlockInline;
