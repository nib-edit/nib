const image = {
  group: "inline",
  inline: true,
  attrs: {
    src: { default: "" },
    height: { default: "auto" },
    alt: { default: "" }
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
          style: domNode.getAttribute("style"),
          alt: domNode.getAttribute("alt")
        };
      }
    }
  ],
  toDOM(node) {
    const { src, height, alt } = node.attrs;
    return ["img", { src, style: `height:${height || "auto"};`, alt }];
  }
};

export default image;
