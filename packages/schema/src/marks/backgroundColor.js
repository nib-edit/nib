const backgroundColor = {
  attrs: {
    color: ""
  },
  parseDOM: [
    {
      style: "background-color",
      getAttrs(color) {
        return {
          color
        };
      }
    }
  ],
  toDOM(node) {
    return ["a", { style: `background-color: ${node.attrs.color}` }, 0];
  }
};

export default backgroundColor;
