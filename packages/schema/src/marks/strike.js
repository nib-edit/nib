const strikeDOM = ["s", 0];
const strike = {
  parseDOM: [
    { tag: "strike" },
    { tag: "s" },
    { tag: "del" },
    {
      style: "text-decoration",
      getAttrs: value => value === "line-through" && null
    }
  ],
  toDOM: () => strikeDOM
};

export default strike;
