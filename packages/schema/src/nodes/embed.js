const embed = {
  group: "inline",
  inline: true,
  attrs: {
    html: { default: "" }
  },
  draggable: true,
  parseDOM: [
    {
      tag: "span[data-nib-embed]",
      getAttrs(domNode) {
        return {
          html: domNode.getAttribute("data-nib-embed")
        };
      }
    }
  ],
  toDOM(node) {
    return ["span", { "data-nib-embed": node.attrs.html }];
  }
};

export default embed;
