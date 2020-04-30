import React, { useState } from 'react';
import Editor from 'nib-core';

import AdvanceImage from 'nib-advance-image';
import Code from '../../Code';
import uploadCallback from '../../common/uploadCallback';
import defaultValue from './sampleData';

const imagePlugin = new AdvanceImage(uploadCallback);

/**
 * @visibleName 2. Advance Image
 */
const AdvanceImageComponent = () => {
  const [content, setContent] = useState();
  return (
    <div>
      <Editor
        licenseKey="c1ba076f-6793-45d4-a66d-02d4204b6297"
        config={{
          plugins: { options: 'help' },
          toolbar: {
            options: 'top',
            top: { options: 'advance-image help' },
          },
        }}
        addons={[imagePlugin]}
        onChange={setContent}
        defaultValue={defaultValue}
      />
      <Code content={content || defaultValue} />
    </div>
  );
};

export default AdvanceImageComponent;

/** For users with commercial license of Nib, image upload and save is available from Nib's AWS S3 drive.
  < br /> <br />
Users can use their own image upload option by providing`uploadCallback` prop.The function should take care of uploading image and it should return a promise which resolves to give an object with an attribute`src` which is used as `src` for the image. * */
