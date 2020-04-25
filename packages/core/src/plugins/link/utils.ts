import { linkPluginKey } from './plugin';
import { EditorState } from 'prosemirror-state';

export const isLinkMarkActive = (state: EditorState) => {
  const pluginState = linkPluginKey.getState(state);
  return pluginState && !!pluginState.link;
};
