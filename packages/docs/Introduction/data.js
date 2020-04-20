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
        content: [
          {
            type: 'embed',
            attrs: {
              html:
                '<iframe src="https://www.youtube.com/embed/p1f7cs4Gv2Y" width="640" height="360" frameborder="0" allowfullscreen></iframe>',
            },
          },
        ],
      },
      {
        type: 'paragraph',
        content: [{ type: 'text', text: 'Click image to resize it' }],
      },
      {
        type: 'advanceImage',
        attrs: { src: 'https://i.imgur.com/2FCfbgg.jpg', height: '358px' },
      },
      { type: 'paragraph' },
      {
        type: 'table',
        content: [
          {
            type: 'table_row',
            content: [
              {
                type: 'table_header',
                attrs: { colspan: 1, rowspan: 1, colwidth: [71] },
                content: [
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: 'S.No' }],
                  },
                ],
              },
              {
                type: 'table_header',
                attrs: { colspan: 1, rowspan: 1, colwidth: null },
                content: [
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: 'Name' }],
                  },
                ],
              },
              {
                type: 'table_header',
                attrs: { colspan: 1, rowspan: 1, colwidth: null },
                content: [
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: 'Score' }],
                  },
                ],
              },
              {
                type: 'table_header',
                attrs: { colspan: 1, rowspan: 1, colwidth: null },
                content: [
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: 'Grade' }],
                  },
                ],
              },
            ],
          },
          {
            type: 'table_row',
            content: [
              {
                type: 'table_cell',
                attrs: { colspan: 1, rowspan: 1, colwidth: [71] },
                content: [
                  { type: 'paragraph', content: [{ type: 'text', text: '1' }] },
                ],
              },
              {
                type: 'table_cell',
                attrs: { colspan: 1, rowspan: 1, colwidth: null },
                content: [
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: 'Apple' }],
                  },
                ],
              },
              {
                type: 'table_cell',
                attrs: { colspan: 1, rowspan: 1, colwidth: null },
                content: [
                  { type: 'paragraph', content: [{ type: 'text', text: '1' }] },
                ],
              },
              {
                type: 'table_cell',
                attrs: { colspan: 1, rowspan: 1, colwidth: null },
                content: [
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: 'A+' }],
                  },
                ],
              },
            ],
          },
          {
            type: 'table_row',
            content: [
              {
                type: 'table_cell',
                attrs: { colspan: 1, rowspan: 1, colwidth: [71] },
                content: [
                  { type: 'paragraph', content: [{ type: 'text', text: '2' }] },
                ],
              },
              {
                type: 'table_cell',
                attrs: { colspan: 1, rowspan: 1, colwidth: null },
                content: [
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: 'Banana' }],
                  },
                ],
              },
              {
                type: 'table_cell',
                attrs: { colspan: 1, rowspan: 1, colwidth: null },
                content: [
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: '0.9' }],
                  },
                ],
              },
              {
                type: 'table_cell',
                attrs: { colspan: 1, rowspan: 1, colwidth: null },
                content: [
                  { type: 'paragraph', content: [{ type: 'text', text: 'A' }] },
                ],
              },
            ],
          },
          {
            type: 'table_row',
            content: [
              {
                type: 'table_cell',
                attrs: { colspan: 1, rowspan: 1, colwidth: [71] },
                content: [
                  { type: 'paragraph', content: [{ type: 'text', text: '3' }] },
                ],
              },
              {
                type: 'table_cell',
                attrs: { colspan: 1, rowspan: 1, colwidth: null },
                content: [
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: 'Grapes' }],
                  },
                ],
              },
              {
                type: 'table_cell',
                attrs: { colspan: 1, rowspan: 1, colwidth: null },
                content: [
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: '0.8' }],
                  },
                ],
              },
              {
                type: 'table_cell',
                attrs: { colspan: 1, rowspan: 1, colwidth: null },
                content: [
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: 'B+' }],
                  },
                ],
              },
            ],
          },
        ],
      },
      { type: 'paragraph' },
      { type: 'paragraph', content: [{ type: 'text', text: 'I need these:' }] },
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
  selection: { type: 'text', anchor: 182, head: 182 },
};
