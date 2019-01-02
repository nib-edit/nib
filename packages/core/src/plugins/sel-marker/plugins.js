import { Plugin, PluginKey } from "prosemirror-state";
import { DecorationSet, Decoration } from "prosemirror-view";

import { commonPluginKey } from "../common/plugins";

export const selMarkerPluginKey = new PluginKey("sel-marker");

const selMarkerPlugin = new Plugin({
  key: selMarkerPluginKey,

  props: {
    decorations(state) {
      const { editorHasFocus } = state && commonPluginKey.getState(state);
      if (state.selection.empty || !editorHasFocus) return;
      const { $from, $to } = state.selection;
      return DecorationSet.create(state.doc, [
        Decoration.inline($from.pos, $to.pos, {
          class: "nib-selected",
          style: "position: relative;"
        })
      ]);
    }
  }
});

export default selMarkerPlugin;
