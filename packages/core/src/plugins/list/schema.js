const olDOM = ["ol", 0],
  ulDOM = ["ul", 0],
  liDOM = ["li", 0];

const nodes = {
  listItem: {
    content: "(paragraph){1} (paragraph | orderedList | bulletList)*",
    parseDOM: [{ tag: "li" }],
    toDOM() {
      return liDOM;
    },
    defining: true
  },

  orderedList: {
    content: "listItem+",
    attrs: { order: { default: 1 } },
    group: "block",
    parseDOM: [
      {
        tag: "ol",
        getAttrs(dom) {
          return {
            order: dom.hasAttribute("start") ? +dom.getAttribute("start") : 1
          };
        }
      }
    ],
    toDOM(node) {
      return node.attrs.order == 1
        ? olDOM
        : ["ol", { start: node.attrs.order }, 0];
    }
  },

  bulletList: {
    content: "listItem+",
    parseDOM: [{ tag: "ul" }],
    group: "block",
    toDOM() {
      return ulDOM;
    }
  }
};

export default { nodes };
