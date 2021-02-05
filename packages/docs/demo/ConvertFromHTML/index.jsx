import Editor from "nib-core";
import React, { useState, useEffect } from "react";
import NibConverter from "nib-converter";

import { Schema } from "prosemirror-model";
import { marks, nodes } from "nib-schema";

const schema = new Schema({
  nodes,
  marks,
});

import "./styles.css";

/**
 * @visibleName 14. Convert from HTML
 */
const ConvertFromHTMLDemo = () => {
  const [html, setHTML] = useState(
    '<p style="text-align: center;"><img  src="https://i.imgur.com/jNtUMz9.png" style="height:auto;" alt=""></img></p><p>Hey Nib Editor is rad</p>'
  );
  const [updateEditor, setUpdateEditor] = useState();
  const defaultValue = NibConverter.convertFromHTML(schema, html);
  useEffect(() => {
    if (updateEditor) setUpdateEditor(false);
  }, [updateEditor]);
  return (
    <div>
      <textarea
        placeholder="Enter HTML"
        className="nib-html_textarea"
        value={html}
        onChange={(evt) => setHTML(evt.target.value)}
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
            toolbar: {
              options: "top",
            },
          }}
          defaultValue={defaultValue}
        />
      )}
    </div>
  );
};

export default ConvertFromHTMLDemo;
