import React, { useState } from 'react';
import Editor from 'nib-core';
import videoPlugin from 'nib-video';

import Code from '../../Code';
import defaultValue from './sampleData';

/**
 * @visibleName 3. Video
 */
const Video = () => {
  const [content, setContent] = useState();
  return (
    <div>
      <Editor
        config={{
          plugins: { options: '' },
          toolbar: {
            options: 'top',
            top: { options: 'video' },
          },
        }}
        onChange={setContent}
        defaultValue={defaultValue}
        addons={[videoPlugin]}
      />
      <Code content={content || defaultValue} />
    </div>
  );
};

export default Video;
