import React, { useState } from "react";
import Editor from "nib-core";

import Code from "../../Code";
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
          toolbar: {
            options: "top",
            top: { options: "block inline list history" }
          }
        }}
        onChange={setContent}
        defaultValue={defaultValue}
      />
      <Code content={content || defaultValue} />
    </div>
  );
};

export default BlockInline;
