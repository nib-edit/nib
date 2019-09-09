export default {
  doc: {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "This "
          },
          {
            type: "text",
            marks: [
              {
                type: "em"
              },
              {
                type: "strong"
              }
            ],
            text: "editor"
          },
          {
            type: "text",
            marks: [
              {
                type: "em"
              }
            ],
            text: " is super"
          },
          {
            type: "text",
            text: " "
          },
          {
            type: "text",
            marks: [
              {
                type: "underline"
              }
            ],
            text: "cool"
          },
          {
            type: "text",
            text: "...."
          }
        ]
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Hey check out "
          },
          {
            type: "text",
            marks: [
              {
                type: "link",
                attrs: {
                  href: "https://github.com/nib-edit"
                }
              }
            ],
            text: "more"
          }
        ]
      },
      {
        type: "paragraph",
        content: [
          {
            type: "embed",
            attrs: {
              html:
                '<iframe src="https://www.youtube.com/embed/zjk4BQtq4dw" width="640" height="360" frameborder="0" allowfullscreen></iframe>'
            }
          }
        ]
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "My favourite car"
          }
        ]
      },
      {
        type: "paragraph",
        content: [
          {
            type: "image",
            attrs: {
              src: "https://i.imgur.com/eLSmGAB.jpg",
              style: {
                height: "auto",
                width: "auto"
              }
            }
          }
        ]
      },
      {
        type: "paragraph"
      },
      {
        type: "table",
        content: [
          {
            type: "table_row",
            content: [
              {
                type: "table_header",
                attrs: {
                  colspan: 1,
                  rowspan: 1,
                  colwidth: [116]
                },
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "S.No."
                      }
                    ]
                  }
                ]
              },
              {
                type: "table_header",
                attrs: {
                  colspan: 1,
                  rowspan: 1,
                  colwidth: [190]
                },
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "Name"
                      }
                    ]
                  }
                ]
              },
              {
                type: "table_header",
                attrs: {
                  colspan: 1,
                  rowspan: 1,
                  colwidth: [64]
                },
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "Score"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            type: "table_row",
            content: [
              {
                type: "table_cell",
                attrs: {
                  colspan: 1,
                  rowspan: 1,
                  colwidth: [116]
                },
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "1"
                      }
                    ]
                  }
                ]
              },
              {
                type: "table_cell",
                attrs: {
                  colspan: 1,
                  rowspan: 1,
                  colwidth: [190]
                },
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "Happy"
                      }
                    ]
                  }
                ]
              },
              {
                type: "table_cell",
                attrs: {
                  colspan: 1,
                  rowspan: 1,
                  colwidth: [64]
                },
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "10"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            type: "table_row",
            content: [
              {
                type: "table_cell",
                attrs: {
                  colspan: 1,
                  rowspan: 1,
                  colwidth: [116]
                },
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "2"
                      }
                    ]
                  }
                ]
              },
              {
                type: "table_cell",
                attrs: {
                  colspan: 1,
                  rowspan: 1,
                  colwidth: [190]
                },
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "Sad"
                      }
                    ]
                  }
                ]
              },
              {
                type: "table_cell",
                attrs: {
                  colspan: 1,
                  rowspan: 1,
                  colwidth: [64]
                },
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "0"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        type: "paragraph"
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "I love this editor..."
          }
        ]
      }
    ]
  },
  selection: {
    type: "text",
    anchor: 1,
    head: 1
  }
};
