export default {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "This editor is rad"
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
              '<iframe src="https://player.vimeo.com/video/253989945?app_id=122963" width="640" height="360" frameborder="0" title="Sample Video" allow="autoplay; fullscreen" allowfullscreen></iframe>'
          }
        }
      ]
    },
    {
      type: "heading",
      attrs: {
        level: "3"
      },
      content: [
        {
          type: "text",
          text: "Some flowers for you"
        }
      ]
    },
    {
      type: "paragraph",
      content: [
        {
          type: "image",
          attrs: {
            src: "https://i.imgur.com/UvtVxv1.jpg",
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
    }
  ]
};
