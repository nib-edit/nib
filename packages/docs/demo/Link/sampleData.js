export default {
  doc: {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          { type: "text", text: "Nib editor " },
          {
            type: "text",
            marks: [
              {
                type: "link",
                attrs: { href: "https://github.com/nib-edit/Nib" }
              }
            ],
            text: "repo"
          },
          { type: "text", text: "." }
        ]
      }
    ]
  },
  selection: { type: "text", anchor: 16, head: 16 }
};
