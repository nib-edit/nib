import { toggleMark } from 'prosemirror-commands';
import {
  ProsemirrorCommand,
  ProsemirrorDispatch
} from '../../types/prosemirror';
import { KeyValue } from '../../types/common';
import { EditorState } from 'prosemirror-state';

const toggleMarkofType = (
  markTypeName: string,
  attrs?: KeyValue
): ProsemirrorCommand => (state, dispatch) => {
  const markType = state.schema.marks[markTypeName];
  return toggleMark(markType, attrs)(state, dispatch);
};

export default () => ({
  'Mod-b': (state: EditorState, dispatch: ProsemirrorDispatch) =>
    toggleMarkofType('strong')(state, dispatch),
  'Mod-i': (state: EditorState, dispatch: ProsemirrorDispatch) =>
    toggleMarkofType('em')(state, dispatch),
  'Mod-u': (state: EditorState, dispatch: ProsemirrorDispatch) =>
    toggleMarkofType('underline')(state, dispatch),
  'Mod-Shift-s': (state: EditorState, dispatch: ProsemirrorDispatch) =>
    toggleMarkofType('strike')(state, dispatch),
  'Mod-Shift-m': (state: EditorState, dispatch: ProsemirrorDispatch) =>
    toggleMarkofType('code')(state, dispatch)
});

export const KeymapInfo = {
  strong: { key: 'Mod-B', label: 'Bold' },
  em: { key: 'Mod-I', label: 'Italic' },
  underline: { key: 'Mod-U', label: 'Underline' },
  strike: { key: 'Mod-Shift-S', label: 'Strikethrough' },
  code: { key: 'Mod-Shift-M', label: 'Code' }
};
