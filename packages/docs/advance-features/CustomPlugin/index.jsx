import React, { useState } from 'react';
import Editor from 'nib-core';
import H1Plugin from './H1';

import Code from '../../Code';
import defaultValue from './sampleData';

/**
 * @visibleName 4. Custom Plugin
 */
const CustomPlugin = () => {
  const [content, setContent] = useState();
  return (
    <div>
      <Editor
        config={{
          plugins: { options: '' },
          toolbar: {
            options: 'top',
            top: { options: 'heading1' },
          },
        }}
        onChange={setContent}
        defaultValue={defaultValue}
        addons={[H1Plugin]}
      />
      <Code content={content || defaultValue} />
    </div>
  );
};

export default CustomPlugin;
