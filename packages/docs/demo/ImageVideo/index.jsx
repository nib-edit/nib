import React, { useState } from "react";
import Editor from "nib-core";
import uploadCallback from "../../common/uploadCallback";

import Code from "../../Code";
import defaultValue from "./sampleData";

/**
 * @visibleName 3. Image Video
 */
const ImageVideo = () => {
  const [content, setContent] = useState();
  return (
    <div>
      <Editor
        config={{
          plugins: {
            options: "block image video",
            image: {
              uploadCallback
            }
          },
          toolbar: {
            options: "top",
            top: { options: "block image video history" }
          }
        }}
        onChange={setContent}
        defaultValue={defaultValue}
      />
      <Code content={content || defaultValue} />
    </div>
  );
};

export default ImageVideo;
