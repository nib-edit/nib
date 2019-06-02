import Editor from "nib-core";
import React, {useState} from "react";
import {convertToHTML} from "nib-converter";

import uploadCallback from "../../common/uploadCallback";

/**
 * @visibleName 4. Convert to HTML
 */
const ConvertToHTMLDemo = () => {
  const [content, setContent] = useState({});
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
      />
      <div style={{marginTop: 20}}>HTML String Content:</div>
      <pre style={{whiteSpace: "inherit"}}>{convertToHTML(content)}</pre>
    </div>
  );
};

export default ConvertToHTMLDemo;
