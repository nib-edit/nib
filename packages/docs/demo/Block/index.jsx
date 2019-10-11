import React, { useState } from "react";
import Editor from "nib-core";

import Code from "../../Code";
import defaultValue from "./sampleData";

/**
 * @visibleName 2. Block
 */
const Block = ({ grouped }) => {
  const [content, setContent] = useState();
  return (
    <div>
      <Editor
        config={{
          plugins: { options: "block" },
          toolbar: {
            options: "top",
            top: {
              block: { grouped },
              options: "block"
            }
          }
        }}
        onChange={setContent}
        defaultValue={defaultValue}
        styleConfig={{
          editor: () => ({
            height: "200px"
          })
        }}
      />
      <Code content={content || defaultValue} />
    </div>
  );
};

export default Block;
