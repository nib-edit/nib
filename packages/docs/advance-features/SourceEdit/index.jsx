import React, { useState } from "react";
import Editor from "nib-core";
import sourceEditPlugin from "nib-sourceedit";

import Code from "../../Code";
import defaultValue from "./sampleData";

/**
 * @visibleName 4. Source Code Editing
 */
const SourceCodeEditing = () => {
  const [content, setContent] = useState();
  return (
    <div>
      <Editor
        licenseKey="c1ba076f-6793-45d4-a66d-02d4204b6297"
        config={{
          toolbar: {
            options: "top",
            top: { options: "sourceedit" },
          },
        }}
        onChange={setContent}
        defaultValue={defaultValue}
        addons={[sourceEditPlugin]}
      />
      <Code content={content || defaultValue} />
    </div>
  );
};

export default SourceCodeEditing;
