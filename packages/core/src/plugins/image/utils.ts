import { EditorState } from 'prosemirror-state';

import { imagePluginKey } from './plugin';

export const isImageSelected = (state: EditorState) =>
  imagePluginKey.getState(state).isImageSelected;
