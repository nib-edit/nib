import React, { useState } from 'react';
import Editor from 'nib-core';

import Code from '../../Code';
import defaultValue from './sampleData';

/**
 * @visibleName 8. Image
 */
const Image = () => {
  const [content, setContent] = useState();
  return (
    <div>
      <Editor
        config={{
          plugins: {
            options: 'image',
          },
          toolbar: {
            options: 'top',
            top: { options: 'image' },
          },
        }}
        onChange={setContent}
        defaultValue={defaultValue}
      />
      <Code content={content || defaultValue} />
    </div>
  );
};

export default Image;
