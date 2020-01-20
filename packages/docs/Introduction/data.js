export default {
  doc: {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [
          { type: 'text', marks: [{ type: 'code' }], text: 'This' },
          { type: 'text', text: ' ' },
          { type: 'text', marks: [{ type: 'strong' }], text: 'editor' },
          { type: 'text', text: ' ' },
          { type: 'text', marks: [{ type: 'em' }], text: 'is' },
          { type: 'text', text: ' ' },
          { type: 'text', marks: [{ type: 'underline' }], text: 'RAD' },
          { type: 'text', text: '.' },
        ],
      },
      {
        type: 'paragraph',
        content: [{ type: 'text', text: 'Click image to select it' }],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'image',
            attrs: {
              src: 'https://i.imgur.com/2FCfbgg.jpg',
              height: '358px',
              alt: '',
            },
          },
          { type: 'text', text: 'I need these:' },
        ],
      },
      {
        type: 'bulletList',
        content: [
          {
            type: 'listItem',
            content: [
              { type: 'paragraph', content: [{ type: 'text', text: 'Paper' }] },
            ],
          },
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [{ type: 'text', text: 'Pencil' }],
              },
            ],
          },
          {
            type: 'listItem',
            content: [
              { type: 'paragraph', content: [{ type: 'text', text: 'Pen' }] },
            ],
          },
        ],
      },
    ],
  },
  selection: { type: 'text', anchor: 52, head: 52 },
};
