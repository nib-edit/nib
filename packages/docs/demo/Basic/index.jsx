import React, { useState } from "react";
import Editor from "nib-core";

import Code from "../../Code";
import defaultValue from "./sampleData";

/**
 * @visibleName 1. Basic
 */
const Basic = () => {
  const [content, setContent] = useState();
  return (
    <div>
      <Editor
        config={{
          plugins: { options: "" },
          toolbar: { options: "" }
        }}
        onChange={setContent}
        defaultValue={defaultValue}
      />
      <Code content={content || defaultValue} />
    </div>
  );
};

export default Basic;
