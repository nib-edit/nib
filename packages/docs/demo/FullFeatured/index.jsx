import React, { useState } from "react";
import Editor from "nib-core";

import uploadCallback from "../../common/uploadCallback";
import defaultValue from "./sampleData";

/**
 * @visibleName 3. Full Featured
 */
const FullFeatured = () => {
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
            options: "top",
            top: {
              block: { grouped: true }
            }
          }
        }}
        onChange={setContent}
        defaultValue={defaultValue}
      />
      <pre>{JSON.stringify(content || defaultValue, null, 4)}</pre>
    </div>
  );
};

export default FullFeatured;
