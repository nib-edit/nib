const image = {
  group: "inline",
  inline: true,
  attrs: {
    src: { default: "" },
    height: { default: "auto" }
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
    const { src, height } = node.attrs;
    return ["img", { src, style: `height:${height || "auto"};` }];
  }
};

export default image;
