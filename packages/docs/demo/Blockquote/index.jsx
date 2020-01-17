import React, { useState } from 'react';
import Editor from 'nib-core';

import Code from '../../Code';
import defaultValue from './sampleData';

/**
 * @visibleName 6. Blockquote
 */
const Blockquote = () => {
  const [content, setContent] = useState();
  return (
    <div>
      <Editor
        config={{
          plugins: { options: 'blockquote' },
          toolbar: {
            options: 'top',
            top: { options: 'blockquote' },
          },
        }}
        onChange={setContent}
        defaultValue={defaultValue}
      />
      <Code content={content || defaultValue} />
    </div>
  );
};

export default Blockquote;
