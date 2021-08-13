import Editor from 'nib-core';
import React, { useState } from 'react';
import NibConverter from 'nib-converter';
import { marks, nodes } from "nib-schema";

import { Schema } from "prosemirror-model";
import Code from '../../Code';
import defaultValue from './sampleData';
import './styles.css';

const schema = new Schema({
  nodes,
  marks,
});

/**
 * @visibleName 15. Convert to HTML
 */
const ConvertToHTMLDemo = () => {
  const [content, setContent] = useState();
  const htmlStr = NibConverter.convertToHTML(schema, (content || defaultValue).doc);
  return (
    <div>
      <Editor
        config={{
          toolbar: {
            options: 'top',
          },
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
