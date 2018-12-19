import { Plugin, PluginKey } from "prosemirror-state";
import { DecorationSet, Decoration } from "prosemirror-view";

export const selMarkerPluginKey = new PluginKey("sel-marker");

const selMarkerPlugin = new Plugin({
  key: selMarkerPluginKey,

  props: {
    decorations(state) {
      if (state.selection.empty) return;
      const { $from, $to } = state.selection;
      return DecorationSet.create(state.doc, [
        Decoration.inline($from.pos, $to.pos, {
          class: "editr-selected",
          style: "position: relative;"
        })
      ]);
    }
  }
});

export default [selMarkerPlugin];
