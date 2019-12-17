import Editor from "nib-core";
import React, { useState } from "react";
import NibConverter from "nib-converter";

import Code from "../../Code";
import uploadCallback from "../../common/uploadCallback";
import defaultValue from "./sampleData";

import "./styles.css";

/**
 * @visibleName 16. Convert to HTML
 */
const ConvertToHTMLDemo = () => {
  const [content, setContent] = useState();
  const htmlStr = NibConverter.convertToHTML((content || defaultValue).doc);
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
        defaultValue={defaultValue}
      />
      <h3>Generated HTML content</h3>
      <div
        className="nib-html_wrapper"
        dangerouslySetInnerHTML={{ __html: htmlStr }}
      />
      <Code content={htmlStr} label="Click to view HTML content" />
    </div>
  );
};

export default ConvertToHTMLDemo;
