import React from 'react';
import Editor from 'nib-core';

const defaultValue = {
  doc: {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            marks: [
              {
                type: 'em',
              },
            ],
            text:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          },
        ],
      },
    ],
  },
  selection: {
    type: 'text',
    anchor: 1,
    head: 1,
  },
};

/**
 * @visibleName 12. Inline toolbar
 */
const InlineToolbar = () => {
  return (
    <div spellCheck={false} style={{ color: '#0000e4' }}>
      <Editor
        config={{
          plugins: { options: 'block inline link' },
          toolbar: {
            options: 'inline',
            inline: {
              options: 'block inline link',
              block: { options: 'p h1 h2', grouped: false },
            },
          },
        }}
        defaultValue={defaultValue}
        styleConfig={{
          wrapper: () => ({
            color: '#0000e4',
            borderTop: 'none',
            borderBottom: 'none',
            borderLeft: 'none',
            borderRight: 'none',
          }),
          editor: () => ({
            color: '#0000e4',
          }),
        }}
      />
    </div>
  );
};

export default InlineToolbar;
