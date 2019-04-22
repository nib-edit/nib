import React from "react";
import Editor from "nib-core";
import uploadCallback from "../../common/uploadCallback";

/**
 * @visibleName 4. Image
 */
const ImagePlugin = () => (
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
        top: {options: "image"}
      }
    }}
  />
);

export default ImagePlugin;
