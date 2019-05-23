const pDOM = ["br", 0];

const hard_break = {
  inline: true,
  group: "inline",
  selectable: false,
  parseDOM: [{ tag: "br" }],
  toDOM() {
    return pDOM;
  }
};

export default hard_break;
