const liDOM = ["li", 0];

const listItem = {
  content: "(paragraph){1} (paragraph | orderedList | bulletList)*",
  group: "block",
  parseDOM: [{ tag: "li" }],
  toDOM() {
    return liDOM;
  },
  defining: true
};

export default listItem;
