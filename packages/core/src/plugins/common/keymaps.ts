import { Selection, TextSelection, EditorState } from 'prosemirror-state';
import {
  IProsemirrorDispatch,
  IProsemirrorCommand,
} from '../../types/prosemirror';

const insertHardBreak = (): IProsemirrorCommand => (state, dispatch) => {
  const { hardBreak } = state.schema.nodes;
  dispatch(state.tr.replaceSelectionWith(hardBreak.create()));
};

export default () => ({
  'Shift-Enter': (state: EditorState, dispatch: IProsemirrorDispatch) =>
    insertHardBreak()(state, dispatch),
  'Mod-a': (state: EditorState, dispatch: IProsemirrorDispatch) => {
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
