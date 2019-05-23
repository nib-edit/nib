const pDOM = ["br", 0];

const hard_break = {
  content: "",
  group: "block",
  parseDOM: [{ tag: "br" }],
  toDOM() {
    return pDOM;
  }
};

export default hard_break;
