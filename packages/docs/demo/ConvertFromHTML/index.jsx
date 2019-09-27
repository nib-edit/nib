import Editor from "nib-core";
import React, { useState, useEffect } from "react";
import NibConverter from "nib-converter";

import uploadCallback from "../../common/uploadCallback";

import "./styles.css";

/**
 * @visibleName 5. Convert from HTML
 */
const ConvertFromHTMLDemo = () => {
  const [html, setHTML] = useState();
  const [updateEditor, setUpdateEditor] = useState();
  const defaultValue = NibConverter.convertFromHTML(html);
  useEffect(() => {
    if (updateEditor) setUpdateEditor(false);
  }, [updateEditor]);
  return (
    <div>
      <textarea
        placeholder="Enter HTML"
        className="nib-html_textarea"
        value={html}
        onChange={evt => setHTML(evt.target.value)}
      />
      <button
        className="docs_btn nib-html_btn"
        type="button"
        onClick={() => setUpdateEditor(true)}
      >
        Update Editor
      </button>
      {!updateEditor && (
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
          defaultValue={defaultValue}
        />
      )}
    </div>
  );
};

export default ConvertFromHTMLDemo;
