const ulDOM = ["ul", 0];

const bulletList = {
  content: "listItem+",
  parseDOM: [{ tag: "ul" }],
  group: "block",
  toDOM() {
    return ulDOM;
  }
};

export default bulletList;
