import { insertParagraphCmd, wrapLiftBlockquote } from './commands';
import { IProsemirrorDispatch } from '../../types/prosemirror';
import { EditorState } from 'prosemirror-state';

export default () => ({
  Enter: (state: EditorState, dispatch: IProsemirrorDispatch) =>
    insertParagraphCmd(state, dispatch),
  "Mod-'": (state: EditorState, dispatch: IProsemirrorDispatch) => {
    return wrapLiftBlockquote(state, dispatch);
  },
});

export const KeymapInfo = {
  insertBlockquote: { key: "Mod-'", label: 'Insert Blockquote' },
};
