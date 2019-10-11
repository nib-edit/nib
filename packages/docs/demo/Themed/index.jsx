import React, { useState } from "react";
import Editor from "nib-core";

import uploadCallback from "../../common/uploadCallback";
import defaultValue from "./sampleData";

const customTheme = {
  color: {
    highlight: { secondary: "#424242" },
    text: { primary: "#e0e0e0", secondary: "#bdbdbd" },
    background: {
      primary: "#212121",
      secondary: "#424242"
    },
    border: {
      primary: "#636363"
    },
    blurMarker: "#616161"
  },
  border: {
    primary: "1px solid #636363"
  },
  boxShadow: {
    secondary: "#424242 0px 1px 0px"
  }
};

/**
 * @visibleName 12. Themed
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
