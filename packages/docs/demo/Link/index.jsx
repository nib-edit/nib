import React, { useState } from "react";
import Editor from "nib-core";

import Code from "../../Code";
import defaultValue from "./sampleData";

/**
 * @visibleName 4. Link
 */
const Link = () => {
  const [content, setContent] = useState();
  return (
    <div>
      <Editor
        config={{
          plugins: { options: "link" },
          toolbar: {
            options: "top",
            top: { options: "link" }
          }
        }}
        onChange={setContent}
        defaultValue={defaultValue}
      />
      <Code content={content || defaultValue} />
    </div>
  );
};

export default Link;
