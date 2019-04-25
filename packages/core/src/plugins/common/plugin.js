import {Plugin, PluginKey} from "prosemirror-state";
import {DecorationSet, Decoration} from "prosemirror-view";

export const commonPluginKey = new PluginKey("common");

export default new Plugin({
  key: commonPluginKey,

  state: {
    init: () => {
      return {editorHasFocus: false, hideInlineToolbar: false};
    },
    apply(tr, value) {
      const newValue = {...value};
      let editorHasFocus = tr.getMeta("EDITOR_FOCUSED");
      if (editorHasFocus !== undefined)
        newValue.editorHasFocus = editorHasFocus;
      newValue.hideInlineToolbar = tr.getMeta("HIDE_OVERLAYS");
      return newValue;
    }
  },

  props: {
    handleDOMEvents: {
      focus: view => {
        const {state, dispatch} = view;
        dispatch(state.tr.setMeta("EDITOR_FOCUSED", true));
        return false;
      },
      blur: view => {
        const {state, dispatch} = view;
        dispatch(state.tr.setMeta("EDITOR_FOCUSED", false));
        return false;
      }
    },
    decorations(state) {
      const {editorHasFocus, hideInlineToolbar} =
        state && commonPluginKey.getState(state);
      if (state.selection.empty || !editorHasFocus || hideInlineToolbar) return;
      const {$from, $to} = state.selection;
      return DecorationSet.create(state.doc, [
        Decoration.inline($from.pos, $to.pos, {
          class: "nib-selected",
          style: "position: relative;"
        })
      ]);
    }
  }
});
