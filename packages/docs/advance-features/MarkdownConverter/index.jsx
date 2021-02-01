import React, { useEffect, useState } from "react";
import Editor from "nib-core";
import MarkdownConverterClass from "nib-markdown-converter";

import Code from "../../Code";

const MarkdownConverter = new MarkdownConverterClass({
  licenseKey: "demo-page",
});

/**
 * @visibleName 6. Markdown Converter
 */
const MarkdownConverterComponent = () => {
  const [input, setInput] = useState(`# heading 1

**bold**
*italic*
[link](www.dummy.com)

* un-ordered list item 1

* un-ordered list item 2

1. ordered list item 1

2. ordered list item 2`);
  const [markdown, setMarkdown] = useState("");
  const updateMarkdown = (content) => {
    setMarkdown(MarkdownConverter.convertToMarkdown(content.doc));
  };
  const [updateEditor, setUpdateEditor] = useState();
  const defaultValue = MarkdownConverter.convertFromMarkdown(input);
  useEffect(() => {
    if (updateEditor) setUpdateEditor(false);
    updateMarkdown({ doc: defaultValue.toJSON() });
  }, [updateEditor]);

  return (
    <div>
      <textarea
        placeholder="Enter HTML"
        className="nib-html_textarea"
        value={input}
        onChange={(evt) => setInput(evt.target.value)}
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
            plugins: { options: "block inline link blockquote list image" },
            toolbar: {
              options: "top",
              top: {
                options: "block inline link blockquote list image",
                inline: { options: "strong em strike code" },
              },
            },
          }}
          autofocus
          onChange={updateMarkdown}
          defaultValue={{
            doc: defaultValue.toJSON(),
            selection: { type: "text", anchor: 0, head: 0 },
          }}
        />
      )}
      <Code content={markdown} label="Markdown content" expanded />
    </div>
  );
};

export default MarkdownConverterComponent;
