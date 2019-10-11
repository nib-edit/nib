import React, { useState } from "react";
import Editor from "nib-core";
import uploadCallback from "../../common/uploadCallback";

import Code from "../../Code";
import defaultValue from "./sampleData";

/**
 * @visibleName 6. Image
 */
const Image = () => {
  const [content, setContent] = useState();
  return (
    <div>
      <Editor
        config={{
          plugins: {
            options: "image",
            image: {
              uploadCallback
            }
          },
          toolbar: {
            options: "top",
            top: { options: "image" }
          }
        }}
        onChange={setContent}
        defaultValue={defaultValue}
      />
      <Code content={content || defaultValue} />
    </div>
  );
};

export default Image;
