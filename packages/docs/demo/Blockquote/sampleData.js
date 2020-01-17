export default {
  doc: {
    type: 'doc',
    content: [
      {
        type: 'blockquote',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Hey this is my special quote.',
              },
            ],
          },
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'It works multipline.....',
              },
            ],
          },
        ],
      },
    ],
  },
  selection: {
    type: 'text',
    anchor: 57,
    head: 57,
  },
};
