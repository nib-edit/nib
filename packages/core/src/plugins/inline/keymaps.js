import { toggleMark } from "prosemirror-commands";

const toggleMarkofType = (markTypeName, attrs) => (state, dispatch) => {
  const markType = state.schema.marks[markTypeName];
  return toggleMark(markType, attrs)(state, dispatch);
};

export default {
  "mod-b": (state, dispatch) => toggleMarkofType("strong")(state, dispatch),
  "mod-i": (state, dispatch) =>
    toggleMarkofType("em", { level: 1 })(state, dispatch),
  "mod-u": (state, dispatch) =>
    toggleMarkofType("underline", { level: 2 })(state, dispatch),
  "mod-shift-s": (state, dispatch) =>
    toggleMarkofType("strike", { level: 2 })(state, dispatch)
};

export const keyMaps = {
  strong: "Bold mod-B",
  em: "Italic mod-I",
  underline: "Underline mod-U",
  strike: "Strikethrough mod-shift-S"
};
