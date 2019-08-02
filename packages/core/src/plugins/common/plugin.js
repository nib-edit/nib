import { DecorationSet, Decoration } from "prosemirror-view";
import { Plugin, PluginKey } from "prosemirror-state";

export const commonPluginKey = new PluginKey("common");

export default new Plugin({
  key: commonPluginKey,

  state: {
    init: () => {
      // todo: create separate plugin for inline toolbar
      return { editorHasFocus: false, hideInlineToolbar: false };
    },
    apply(tr, value) {
      const newValue = { ...value };
      const editorFocusState = tr.getMeta("EDITOR_FOCUSED");
      if (editorFocusState !== undefined)
        newValue.editorHasFocus = editorFocusState;
      newValue.hideInlineToolbar = tr.getMeta("HIDE_POPUPS");
      return newValue;
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
      const { editorHasFocus, hideInlineToolbar } = commonPluginKey.getState(
        state
      );
      if (state.selection.empty || !editorHasFocus || hideInlineToolbar)
        return undefined;
      const { $from, $to } = state.selection;
      return DecorationSet.create(state.doc, [
        Decoration.inline($from.pos, $to.pos, {
          class: "nib-selected-marker"
        })
      ]);
    }
  }
});
