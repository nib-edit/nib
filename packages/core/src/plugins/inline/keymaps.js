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
    toggleMarkofType("underline", { level: 2 })(state, dispatch)
};
