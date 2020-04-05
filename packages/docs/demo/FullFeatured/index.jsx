import React, { useState } from 'react';
import Editor from 'nib-core';

import Code from '../../Code';
import defaultValue from './sampleData';

/**
 * @visibleName 4. Full Featured
 */
const FullFeatured = () => {
  const [content, setContent] = useState();
  return (
    <div>
      <Editor
        config={{
          toolbar: {
            options: 'top',
            top: {
              block: { grouped: true },
            },
          },
        }}
        autoFocus
        onChange={setContent}
        defaultValue={defaultValue}
      />
      <Code content={content || defaultValue} />
    </div>
  );
};

export default FullFeatured;
