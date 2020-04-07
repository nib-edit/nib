import { Selection, TextSelection, EditorState } from 'prosemirror-state';
import {
  ProsemirrorDispatch,
  ProsemirrorCommand,
} from '../../types/prosemirror';

const insertHardBreak = (): ProsemirrorCommand => (state, dispatch) => {
  const { hardBreak } = state.schema.nodes;
  dispatch(state.tr.replaceSelectionWith(hardBreak.create()));
};

export default () => ({
  'Shift-Enter': (state: EditorState, dispatch: ProsemirrorDispatch) =>
    insertHardBreak()(state, dispatch),
  'Mod-a': (state: EditorState, dispatch: ProsemirrorDispatch) => {
    const textSelection = new TextSelection(
      Selection.atStart(state.doc).$anchor,
      Selection.atEnd(state.doc).$head
    );
    dispatch(state.tr.setSelection(textSelection));
    return true;
  },
});

export const KeymapInfo = {
  help: { key: 'Shift-Enter', label: 'Soft newline' },
};
