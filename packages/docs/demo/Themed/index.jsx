import React, { useState } from "react";
import Editor from "nib-core";

import uploadCallback from "../../common/uploadCallback";
import defaultValue from "./sampleData";

const customTheme = {
  color: {
    highlight: "#757575",
    lightHighlight: "bdbdbd",
    text: "#ffffff",
    background: "#212121"
  }
};

/**
 * @visibleName 8. Themed
 */
const Themed = () => {
  const [content, setContent] = useState();
  return (
    <div>
      <Editor
        config={{
          plugins: {
            image: {
              uploadCallback
            }
          },
          toolbar: {
            options: "top"
          }
        }}
        onChange={setContent}
        theme={customTheme}
        defaultValue={defaultValue}
      />
      <pre>{JSON.stringify(content || defaultValue, null, 4)}</pre>
    </div>
  );
};

export default Themed;
