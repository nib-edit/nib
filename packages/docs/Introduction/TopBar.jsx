/**
 * TODO:review
 * improve code in all components
 */

import React, { PureComponent } from 'react';
import AdvanceImagePlugin from 'nib-advance-image';
import TablePlugin from 'nib-table';
import VideoPlugin from 'nib-video';

import uploadCallback from '../common/uploadCallback';
import data from './data';

let Editor;
import('nib-core').then(args => {
  Editor = args.default;
});

const theme = {
  editor: () => ({
    height: '440px'
  })
};

class TopBar extends PureComponent {
  render() {
    if (!Editor) return null;
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          margin: '32px 0'
        }}
      >
        <div>
          <Editor
            config={{
              plugins: {
                options: 'block inline color link blockquote list help'
              },
              toolbar: {
                options: 'top',
                top: {
                  options:
                    'block inline color link blockquote list advance-image video table history help'
                }
              }
            }}
            defaultValue={data}
            styleConfig={theme}
            addons={[
              new AdvanceImagePlugin(uploadCallback),
              TablePlugin,
              VideoPlugin
            ]}
          />
        </div>
      </div>
    );
  }
}

export default TopBar;

/**
 * todo:
 * 1. props link to open in new window.
 * 2. add point mobile frendliness
 */
