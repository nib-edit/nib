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
        licenseKey="c1ba076f-6793-45d4-a66d-02d4204b6297"
        config={{
          plugins: { options: 'help' },
          toolbar: {
            options: 'top',
            top: { options: 'table help' },
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
