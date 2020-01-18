import React, { useState } from 'react';
import Editor from 'nib-core';

import Code from '../../Code';
import defaultValue from './sampleData';

/**
 * @visibleName 10. History
 */
const History = () => {
  const [content, setContent] = useState();
  return (
    <div>
      <Editor
        config={{
          plugins: { options: '' },
          toolbar: {
            options: 'top',
            top: { options: 'history' },
          },
        }}
        onChange={setContent}
        defaultValue={defaultValue}
      />
      <Code content={content || defaultValue} />
    </div>
  );
};

export default History;
