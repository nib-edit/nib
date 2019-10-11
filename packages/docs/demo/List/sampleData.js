export default {
  doc: {
    type: "doc",
    content: [
      { type: "paragraph", content: [{ type: "text", text: "My friends:" }] },
      {
        type: "bulletList",
        content: [
          {
            type: "listItem",
            content: [
              { type: "paragraph", content: [{ type: "text", text: "tom" }] }
            ]
          },
          {
            type: "listItem",
            content: [
              { type: "paragraph", content: [{ type: "text", text: "jerry" }] }
            ]
          }
        ]
      },
      {
        type: "paragraph",
        content: [{ type: "text", text: "My best friends:" }]
      },
      {
        type: "orderedList",
        attrs: { order: 1 },
        content: [
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "spiderman" }]
              }
            ]
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "superman" }]
              }
            ]
          }
        ]
      }
    ]
  },
  selection: { type: "text", anchor: 73, head: 73 }
};
