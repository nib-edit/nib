import React from "react";
import Editor from "nib-core";

/**
 * @visibleName 9. Video
 */
const VideoPlugin = () => (
  <Editor
    config={{
      plugins: {
        options: "video"
      },
      toolbar: {
        options: "top",
        top: { options: "video" }
      }
    }}
  />
);

export default VideoPlugin;
