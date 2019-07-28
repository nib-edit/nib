import { baseKeymap } from "prosemirror-commands";
import { keymap } from "prosemirror-keymap";

/**
 * Builds an array of keymap.
 * [[][][]]
 * Each sub-array is array for one key handlers, eg all handlers for Enter.
 */
const addKeyMaps = (oldKeymap, newKeyMap) => {
  const map = { ...oldKeymap };
  Object.keys(newKeyMap).forEach(key => {
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
const combineKeyMaps = keyMaps => {
  const map = {};
  Object.keys(keyMaps).forEach(key => {
    map[key] = (editorState, dispatch) => {
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

export default plugins => {
  let addedMap = {};
  plugins.forEach(plugin => {
    if (plugin && plugin.keymaps) {
      addedMap = addKeyMaps(addedMap, plugin.keymaps);
    }
  });
  addedMap = addKeyMaps(addedMap, baseKeymap);
  addedMap = combineKeyMaps(addedMap);
  return keymap(addedMap);
};

// future: in plugins add priority to keymaps
