import React, { useState } from 'react';
import Editor from 'nib-core';
import TablePlugin from 'nib-table';

import Code from '../../Code';
import defaultValue from './sampleData';

/**
 * @visibleName 1. Table
 */
const Table = () => {
  const [content, setContent] = useState();
  return (
    <div>
      <Editor
        config={{
          plugins: { options: '' },
          toolbar: {
            options: 'top',
            top: { options: 'table' },
          },
        }}
        addons={[TablePlugin]}
        onChange={setContent}
        defaultValue={defaultValue}
      />
      <Code content={content || defaultValue} />
    </div>
  );
};

export default Table;
