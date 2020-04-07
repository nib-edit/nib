import { setBlockType } from 'prosemirror-commands';
import { EditorState } from 'prosemirror-state';
import { IKeyValue } from '../../types/common';
import { IKeymapInfoMap } from '../../types/application';
import { IProsemirrorDispatch } from '../../types/prosemirror';

const changeBlockType = (blockTypeName: string, attrs?: IKeyValue) => (
  state: EditorState,
  dispatch: IProsemirrorDispatch
) => {
  const blockType = state.schema.nodes[blockTypeName];
  return setBlockType(blockType, attrs)(state, dispatch);
};

export default () => ({
  'Mod-Alt-0': (state: EditorState, dispatch: IProsemirrorDispatch) =>
    changeBlockType('paragraph')(state, dispatch),
  'Mod-Alt-1': (state: EditorState, dispatch: IProsemirrorDispatch) =>
    changeBlockType('heading', { level: 1 })(state, dispatch),
  'Mod-Alt-2': (state: EditorState, dispatch: IProsemirrorDispatch) =>
    changeBlockType('heading', { level: 2 })(state, dispatch),
  'Mod-Alt-3': (state: EditorState, dispatch: IProsemirrorDispatch) =>
    changeBlockType('heading', { level: 3 })(state, dispatch),
  'Mod-Alt-4': (state: EditorState, dispatch: IProsemirrorDispatch) =>
    changeBlockType('heading', { level: 4 })(state, dispatch),
  'Mod-Alt-5': (state: EditorState, dispatch: IProsemirrorDispatch) =>
    changeBlockType('heading', { level: 5 })(state, dispatch),
  'Mod-Alt-6': (state: EditorState, dispatch: IProsemirrorDispatch) =>
    changeBlockType('heading', { level: 6 })(state, dispatch),
});

export const KeymapInfo: IKeymapInfoMap = {
  p: { key: 'Mod-Alt-0', label: 'Paragraph' },
  h1: { key: 'Mod-Alt-1', label: 'Heading1' },
  h2: { key: 'Mod-Alt-2', label: 'Heading2' },
  h3: { key: 'Mod-Alt-3', label: 'Heading3' },
  h4: { key: 'Mod-Alt-4', label: 'Heading4' },
  h5: { key: 'Mod-Alt-5', label: 'Heading5' },
  h6: { key: 'Mod-Alt-6', label: 'Heading6' },
};
