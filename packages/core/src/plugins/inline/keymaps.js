import { toggleMark } from "prosemirror-commands";

const toggleMarkofType = (markTypeName, attrs) => (editorState, dispatch) => {
  const markType = editorState.schema.marks[markTypeName];
  return toggleMark(markType, attrs)(editorState, dispatch);
};

export default {
  "mod-b": (editorState, dispatch) =>
    toggleMarkofType("strong")(editorState, dispatch),
  "mod-i": (editorState, dispatch) =>
    toggleMarkofType("em", { level: 1 })(editorState, dispatch),
  "mod-u": (editorState, dispatch) =>
    toggleMarkofType("underline", { level: 2 })(editorState, dispatch)
};
