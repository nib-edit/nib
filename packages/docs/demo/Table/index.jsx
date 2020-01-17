import React, { useState } from 'react';
import Editor from 'nib-core';

import Code from '../../Code';
import defaultValue from './sampleData';

/**
 * @visibleName 10. Table
 */
const Table = () => {
  const [content, setContent] = useState();
  return (
    <div>
      <Editor
        config={{
          plugins: { options: 'table' },
          toolbar: {
            options: 'top',
            top: { options: 'table' },
          },
        }}
        onChange={setContent}
        defaultValue={defaultValue}
      />
      <Code content={content || defaultValue} />
    </div>
  );
};

export default Table;
