const textColor = {
  attrs: {
    color: ""
  },
  parseDOM: [
    {
      style: "color",
      getAttrs(color) {
        return {
          color
        };
      }
    }
  ],
  toDOM(node) {
    return ["a", { style: `color: ${node.attrs.color}` }, 0];
  }
};

export default textColor;
