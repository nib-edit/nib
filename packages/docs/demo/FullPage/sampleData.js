export default {
  doc: {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'This editor is rad',
          },
        ],
      },
      {
        type: 'heading',
        attrs: {
          level: '3',
        },
        content: [
          {
            type: 'text',
            text: 'Some flowers for you',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'image',
            attrs: {
              src: 'https://i.imgur.com/UvtVxv1.jpg',
              style: {
                height: 'auto',
                width: 'auto',
              },
            },
          },
        ],
      },
      {
        type: 'paragraph',
      },
    ],
  },
  selection: {
    type: 'text',
    anchor: 1,
    head: 1,
  },
};
