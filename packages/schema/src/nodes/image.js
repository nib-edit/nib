export const image = {
  group: "inline",
  inline: true,
  attrs: {
    src: { default: "" }
  },
  draggable: true,
  parseDOM: [
    {
      tag: 'img[src^="data:image/"]',
      ignore: true
    },
    {
      tag: "img[src]",
      getAttrs(domNode) {
        return {
          src: domNode.getAttribute("src")
        };
      }
    }
  ],
  toDOM(node) {
    return ["img", node.attrs];
  }
};

export default image;
