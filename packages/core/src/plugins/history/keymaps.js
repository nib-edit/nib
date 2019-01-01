import { undo, redo } from "prosemirror-history";

export default {
  "mod-z": (state, dispatch) => undo(state, dispatch),
  "mod-shift-z": (state, dispatch) => redo(state, dispatch)
};
