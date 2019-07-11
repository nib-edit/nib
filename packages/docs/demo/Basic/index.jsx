import React, { useState } from "react";
import Editor from "nib-core";

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
      <pre>{JSON.stringify(content || defaultValue, null, 4)}</pre>
    </div>
  );
};

export default Basic;
