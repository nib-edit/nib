import { EditorState } from 'prosemirror-state';
import { baseKeymap } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';

import { IEditorKeymapCommand } from '../../types/components';
import {
  IProsemirrorCommand,
  IProsemirrorDispatch,
  IProsemirrorViewProvider,
} from '../../types/prosemirror';
import { IEditorPlugin } from '../../types/components';

/**
 * Builds an array of keymap.
 * [[][][]]
 * Each sub-array is array for one key handlers, eg all handlers for Enter.
 */
const addKeyMaps = (
  oldKeymap: IEditorKeymapCommandList,
  newKeyMap: IEditorKeymapCommand
) => {
  const map = { ...oldKeymap };
  Object.keys(newKeyMap).forEach((key) => {
    if (!map[key]) {
      map[key] = [newKeyMap[key]];
    } else {
      map[key].push(newKeyMap[key]);
    }
  });
  return map;
};

/**
 * Combine all handlers for one key.
 */
const combineKeyMaps = (
  keyMaps: IEditorKeymapCommandList
): IEditorKeymapCommand => {
  const map: IEditorKeymapCommand = {};
  Object.keys(keyMaps).forEach((key) => {
    map[key] = (editorState: EditorState, dispatch: IProsemirrorDispatch) => {
      let result = false;
      for (let i = 0; i < keyMaps[key].length; i += 1) {
        if (keyMaps[key][i](editorState, dispatch)) {
          result = true;
          break;
        }
      }
      return result;
    };
  });
  return map;
};

export interface IEditorKeymapCommandList {
  [key: string]: IProsemirrorCommand[];
}

export default (
  plugins: IEditorPlugin[],
  viewProvider?: IProsemirrorViewProvider
) => {
  let addedMap: IEditorKeymapCommandList = {};
  plugins.forEach((plugin) => {
    if (plugin && plugin.keymaps) {
      addedMap = addKeyMaps(addedMap, plugin.keymaps(viewProvider));
    }
  });
  addedMap = addKeyMaps(addedMap, baseKeymap);
  return keymap(combineKeyMaps(addedMap));
};

// future: in plugins add priority to keymaps
