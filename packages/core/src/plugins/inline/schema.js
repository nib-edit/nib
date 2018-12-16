const emDOM = ["em", 0];
const strongDOM = ["strong", 0];
const underlineDOM = ["u", 0];

const marks = {
  em: {
    parseDOM: [{ tag: "i" }, { tag: "em" }, { style: "font-style=italic" }],
    toDOM: () => emDOM
  },

  underline: {
    parseDOM: [{ tag: "u" }, { style: "text-decoration: underline" }],
    toDOM: () => underlineDOM
  },

  strong: {
    parseDOM: [
      { tag: "strong" },
      { tag: "b", getAttrs: node => node.style.fontWeight != "normal" && null },
      {
        style: "font-weight",
        getAttrs: value => /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null
      }
    ],
    toDOM: () => strongDOM
  }
};

export default { marks };
