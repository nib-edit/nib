const liDOM = ["li", 0];

const listItem = {
  content:
    "(paragraph | heading){1} (paragraph | heading | orderedList | bulletList)*",
  group: "block",
  parseDOM: [{ tag: "li" }],
  toDOM() {
    return liDOM;
  },
  defining: true
};

export default listItem;
