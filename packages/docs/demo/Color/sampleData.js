export default {
  doc: {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            marks: [
              {
                type: "textColor",
                attrs: {
                  color: "#c62828"
                }
              }
            ],
            text: "This is text color"
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
                type: "backgroundColor",
                attrs: {
                  color: "#ffeb3b"
                }
              }
            ],
            text: "Highlighting with background color"
          }
        ]
      }
    ]
  },
  selection: {
    type: "text",
    anchor: 21,
    head: 21
  }
};
