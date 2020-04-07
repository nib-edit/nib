import { insertParagraphCmd, wrapLiftBlockquote } from './commands';
import { ProsemirrorDispatch } from '../../types/prosemirror';
import { EditorState } from 'prosemirror-state';

export default () => ({
  Enter: (state: EditorState, dispatch: ProsemirrorDispatch) =>
    insertParagraphCmd(state, dispatch),
  "Mod-'": (state: EditorState, dispatch: ProsemirrorDispatch) => {
    return wrapLiftBlockquote(state, dispatch);
  },
});

export const KeymapInfo = {
  insertBlockquote: { key: "Mod-'", label: 'Insert Blockquote' },
};
