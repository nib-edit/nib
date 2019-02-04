const pDOM = ["p", 0];

const paragraph = {
  content: "inline*",
  group: "block",
  parseDOM: [{ tag: "p" }],
  toDOM() {
    return pDOM;
  }
};

export default paragraph;
