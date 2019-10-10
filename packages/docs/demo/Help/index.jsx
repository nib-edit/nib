import React, { useState } from "react";
import Editor from "nib-core";

import Code from "../../Code";

/**
 * @visibleName 10. Help
 */
const Help = () => {
  const [content, setContent] = useState();
  return (
    <div>
      <Editor
        config={{
          plugins: { options: "block inline help" },
          toolbar: {
            options: "top",
            top: { options: "block inline help" }
          }
        }}
        onChange={setContent}
      />
      <Code content={content} />
    </div>
  );
};

export default Help;
