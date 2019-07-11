export default {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: {
        level: "1"
      },
      content: [
        {
          type: "text",
          text: "This editor support block and inline formatting."
        }
      ]
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: [
            {
              type: "strong"
            }
          ],
          text: "This is bold text."
        }
      ]
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: [
            {
              type: "em"
            }
          ],
          text: "This text is italic."
        }
      ]
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: [
            {
              type: "underline"
            }
          ],
          text: "This is underlined text."
        }
      ]
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: [
            {
              type: "strike"
            }
          ],
          text: "This text is striked."
        }
      ]
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: [
            {
              type: "subsup",
              attrs: {
                type: "sup"
              }
            }
          ],
          text: "Superscript"
        }
      ]
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: [
            {
              type: "subsup",
              attrs: {
                type: "sub"
              }
            }
          ],
          text: "Subscript"
        }
      ]
    },
    {
      type: "bulletList",
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Un-ordered list 1"
                }
              ]
            }
          ]
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Un-ordered list 2"
                }
              ]
            }
          ]
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Un-ordered list 3"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "orderedList",
      attrs: {
        order: 1
      },
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Ordered list 1"
                }
              ]
            }
          ]
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Ordered list 2"
                }
              ]
            }
          ]
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Ordered list 3"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
