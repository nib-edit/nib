const subsup = {
  inclusive: true,
  attrs: { type: { default: "sub" } },
  parseDOM: [
    { tag: "sub", attrs: { type: "sub" } },
    { tag: "sup", attrs: { type: "sup" } }
  ],
  toDOM(mark) {
    return [mark.attrs.type, 0];
  }
};

export default subsup;
