import { redo, undo } from "prosemirror-history";

export default {
  "mod-shift-z": (state, dispatch) => redo(state, dispatch),
  "mod-z": (state, dispatch) => undo(state, dispatch)
};

export const KeymapInfo = {
  redo: { key: "mod-shift-Z", label: "Redo" },
  undo: { key: "mod-Z", label: "Undo" }
};
