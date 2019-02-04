const olDOM = ["ol", 0];

const orderedList = {
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
};

export default orderedList;
