export default {
  doc: {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            marks: [{ type: "strong" }],
            text: "This is bold text."
          }
        ]
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            marks: [{ type: "em" }],
            text: "This text is italic."
          }
        ]
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            marks: [{ type: "underline" }],
            text: "This is underlined text."
          }
        ]
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            marks: [{ type: "strike" }],
            text: "This text is striked."
          }
        ]
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            marks: [{ type: "subsup", attrs: { type: "sup" } }],
            text: "Superscript"
          }
        ]
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            marks: [{ type: "subsup", attrs: { type: "sub" } }],
            text: "Subscript"
          }
        ]
      },
      {
        type: "paragraph",
        content: [{ type: "text", marks: [{ type: "code" }], text: "code" }]
      }
    ]
  },
  selection: { type: "text", anchor: 1, head: 1 }
};
