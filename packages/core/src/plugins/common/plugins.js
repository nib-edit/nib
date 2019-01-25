import { Plugin, PluginKey } from "prosemirror-state";
import { DecorationSet, Decoration } from "prosemirror-view";

export const commonPluginKey = new PluginKey("common");

export default new Plugin({
  key: commonPluginKey,

  state: {
    init: () => {
      return { editorHasFocus: false };
    },
    apply(tr, value) {
      let editorHasFocus = tr.getMeta("EDITOR_FOCUSED");
      if (editorHasFocus !== undefined) return { editorHasFocus };
      return value;
    }
  },

  props: {
    handleDOMEvents: {
      focus: view => {
        const { state, dispatch } = view;
        dispatch(state.tr.setMeta("EDITOR_FOCUSED", true));
        return false;
      },
      blur: view => {
        const { state, dispatch } = view;
        dispatch(state.tr.setMeta("EDITOR_FOCUSED", false));
        return false;
      }
    },
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
