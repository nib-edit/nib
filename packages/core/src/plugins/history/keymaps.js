import { undo, redo } from "prosemirror-history";

export default {
  "mod-z": (editorState, dispatch) => undo(editorState, dispatch),
  "mod-shift-z": (editorState, dispatch) => redo(editorState, dispatch)
};
