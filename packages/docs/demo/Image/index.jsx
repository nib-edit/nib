import React, { useState } from 'react';
import Editor from 'nib-core';
import uploadCallback from '../../common/uploadCallback';

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
            image: {
              uploadCallback,
            },
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

/** For users with commercial license of Nib, image upload and save is available from Nib's AWS S3 drive.
  < br /> <br />
Users can use their own image upload option by providing`uploadCallback` prop.The function should take care of uploading image and it should return a promise which resolves to give an object with an attribute`src` which is used as `src` for the image. * */
