import { redo, undo } from 'prosemirror-history';
import { EditorState } from 'prosemirror-state';
import { ProsemirrorDispatch } from '../../types/prosemirror';

export default () => ({
  'Mod-Shift-z': (state: EditorState, dispatch: ProsemirrorDispatch) =>
    redo(state, dispatch),
  'Mod-z': (state: EditorState, dispatch: ProsemirrorDispatch) =>
    undo(state, dispatch),
});

export const KeymapInfo = {
  redo: { key: 'Mod-Shift-Z', label: 'Redo' },
  undo: { key: 'Mod-Z', label: 'Undo' },
};
