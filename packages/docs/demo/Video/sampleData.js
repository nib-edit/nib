export default {
  doc: {
    type: "doc",
    content: [
      {
        type: "paragraph"
      },

      {
        type: "paragraph",
        content: [
          {
            type: "embed",
            attrs: {
              html:
                '<iframe src="https://www.youtube.com/embed/p1f7cs4Gv2Y" width="640" height="360" frameborder="0" allowfullscreen></iframe>'
            }
          }
        ]
      },
      {
        type: "paragraph"
      }
    ]
  },
  selection: { type: "text", anchor: 1, head: 1 }
};
