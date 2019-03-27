export const image = {
  group: "inline",
  inline: true,
  attrs: {
    src: { default: "" },
    style: { default: { height: "auto", width: "auto" } }
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
          src: domNode.getAttribute("src"),
          style: domNode.getAttribute("style")
        };
      }
    }
  ],
  toDOM(node) {
    return ["img", node.attrs];
  }
};

export default image;
