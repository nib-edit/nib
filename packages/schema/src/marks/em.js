const emDOM = ["em", 0];
const em = {
  parseDOM: [{ tag: "i" }, { tag: "em" }, { style: "font-style=italic" }],
  toDOM: () => emDOM
};

export default em;
