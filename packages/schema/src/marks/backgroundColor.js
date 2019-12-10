const backgroundColor = {
  attrs: {
    color: ""
  },
  parseDOM: [
    {
      style: "background-color",
      getAttrs: value => value
    }
  ],
  toDOM(node) {
    return ["a", { style: `background-color: ${node.attrs.color}` }, 0];
  }
};

export default backgroundColor;
