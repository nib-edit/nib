import { redo, undo } from "prosemirror-history";

export default {
  "mod-shift-z": (state, dispatch) => redo(state, dispatch),
  "mod-z": (state, dispatch) => undo(state, dispatch)
};
