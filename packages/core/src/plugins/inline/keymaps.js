import { toggleMark } from "prosemirror-commands";

const toggleMarkofType = (markTypeName, attrs) => (state, dispatch) => {
  const markType = state.schema.marks[markTypeName];
  return toggleMark(markType, attrs)(state, dispatch);
};

export default () => ({
  "Mod-b": (state, dispatch) => toggleMarkofType("strong")(state, dispatch),
  "Mod-i": (state, dispatch) =>
    toggleMarkofType("em", { level: 1 })(state, dispatch),
  "Mod-u": (state, dispatch) =>
    toggleMarkofType("underline", { level: 2 })(state, dispatch),
  "Mod-Shift-s": (state, dispatch) =>
    toggleMarkofType("strike", { level: 2 })(state, dispatch),
  "Mod-Shift-m": (state, dispatch) =>
    toggleMarkofType("code", { level: 2 })(state, dispatch)
});

export const KeymapInfo = {
  strong: { key: "Mod-B", label: "Bold" },
  em: { key: "Mod-I", label: "Italic" },
  underline: { key: "Mod-U", label: "Underline" },
  strike: { key: "Mod-Shift-S", label: "Strikethrough" },
  code: { key: "Mod-Shift-M", label: "Code" }
};
