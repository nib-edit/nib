import React, { useState } from "react";
import Editor from "nib-core";

import Code from "../../Code";
import defaultValue from "./sampleData";

/**
 * @visibleName 3. Inline
 */
const Inline = () => {
  const [content, setContent] = useState();
  return (
    <div>
      <Editor
        config={{
          plugins: { options: "inline" },
          toolbar: {
            options: "top",
            top: { options: "inline" }
          }
        }}
        onChange={setContent}
        defaultValue={defaultValue}
      />
      <Code content={content || defaultValue} />
    </div>
  );
};

export default Inline;
