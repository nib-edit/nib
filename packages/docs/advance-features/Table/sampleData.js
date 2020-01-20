export default {
  doc: {
    type: 'doc',
    content: [
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
    ],
  },
  selection: { type: 'text', anchor: 1, head: 1 },
};
