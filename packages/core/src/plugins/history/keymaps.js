import { redo, undo } from "prosemirror-history";

export default {
  "Mod-Shift-z": (state, dispatch) => redo(state, dispatch),
  "Mod-z": (state, dispatch) => undo(state, dispatch)
};

export const KeymapInfo = {
  redo: { key: "Mod-Shift-Z", label: "Redo" },
  undo: { key: "Mod-Z", label: "Undo" }
};
