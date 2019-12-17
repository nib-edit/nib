import { DecorationSet, Decoration } from 'prosemirror-view';
import { Plugin, PluginKey } from 'prosemirror-state';

export const commonPluginKey = new PluginKey('common');

export default new Plugin({
  key: commonPluginKey,

  state: {
    init: () => {
      // todo: create separate plugin for inline toolbar
      return { editorHasFocus: false, hideInlineToolbar: false };
    },
    apply(tr, value) {
      const newValue = { ...value };
      const editorFocusState = tr.getMeta('editor-focused');
      if (editorFocusState !== undefined)
        newValue.editorHasFocus = editorFocusState;
      newValue.hideInlineToolbar = tr.getMeta('hide-all-popups');
      return newValue;
    },
  },

  props: {
    handleDOMEvents: {
      focus: view => {
        const { state, dispatch } = view;
        dispatch(state.tr.setMeta('editor-focused', true));
        return false;
      },
      blur: view => {
        const { state, dispatch } = view;
        dispatch(state.tr.setMeta('editor-focused', false));
        return false;
      },
    },
    decorations(state) {
      const { editorHasFocus, hideInlineToolbar } = commonPluginKey.getState(
        state
      );
      if (state.selection.empty || hideInlineToolbar) return undefined;
      let className;
      if (editorHasFocus) className = 'nib-selection-focus-marker';
      else className = 'nib-selection-blur-marker';
      const { $from, $to } = state.selection;
      return DecorationSet.create(state.doc, [
        Decoration.inline($from.pos, $to.pos, {
          class: className,
        }),
      ]);
    },
    handleKeyDown(view, event) {
      const { state, dispatch } = view;
      if (event.key === 'Escape') {
        dispatch(state.tr.setMeta('hide-all-popups', true));
      }
      return false;
    },
    handleClickOn(view) {
      const { state, dispatch } = view;
      dispatch(state.tr.setMeta('editor-clicked', true));
    },
  },
});
