const hardBreak = {
  group: "inline",
  inline: true,
  selectable: false,
  parseDOM: [{ tag: "br" }],
  toDOM() {
    return ["br"];
  }
};

export default hardBreak;
