import { sinkListItem, liftListItem } from 'prosemirror-schema-list';
import { toggleListCmd, splitListItemCmd } from './commands';
import {
  ProsemirrorViewProvider,
  ProsemirrorDispatch
} from '../../types/prosemirror';
import { EditorState } from 'prosemirror-state';

export default (viewProvider: ProsemirrorViewProvider) => ({
  'Mod-Shift-7': (state: EditorState, dispatch: ProsemirrorDispatch) => {
    return toggleListCmd('orderedList', viewProvider()!)(state, dispatch);
  },
  'Mod-Shift-8': (state: EditorState, dispatch: ProsemirrorDispatch) => {
    return toggleListCmd('bulletList', viewProvider()!)(state, dispatch);
  },
  Enter: (state: EditorState, dispatch: ProsemirrorDispatch) => {
    return splitListItemCmd()(state, dispatch);
  },
  Tab: (state: EditorState, dispatch: ProsemirrorDispatch) => {
    return sinkListItem(state.schema.nodes.listItem)(state, dispatch);
  },
  'Shift-Tab': (state: EditorState, dispatch: ProsemirrorDispatch) => {
    return liftListItem(state.schema.nodes.listItem)(state, dispatch);
  }
});

export const KeymapInfo = {
  orderedList: { key: 'Mod-Shift-7', label: 'Numbered List' },
  bulletList: { key: 'Mod-Shift-8', label: 'Bullet List' }
};
