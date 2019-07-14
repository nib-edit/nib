import React, { useState } from "react";
import Editor from "nib-core";

import uploadCallback from "../../common/uploadCallback";
import defaultValue from "./sampleData";

/**
 * @visibleName 3. Full Featured
 */
const FullFeatured = () => {
  const [content, setContent] = useState({});
  return (
    <div>
      <Editor
        config={{
          plugins: {
            image: {
              uploadCallback
            }
          }
        }}
        onChange={setContent}
        defaultValue={defaultValue}
      />
      <pre>{JSON.stringify(content, null, 4)}</pre>
    </div>
  );
};

export default FullFeatured;
