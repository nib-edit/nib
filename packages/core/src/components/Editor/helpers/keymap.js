import { TextSelection } from "prosemirror-state";
import { baseKeymap } from "prosemirror-commands";
import { keymap } from "prosemirror-keymap";

const addKeyMaps = (baseKeymap, newKeyMap) => {
  const map = { ...baseKeymap };
  Object.keys(newKeyMap).forEach(key => {
    if (!map[key]) {
      map[key] = [newKeyMap[key]];
    } else {
      map[key].push(newKeyMap[key]);
    }
  });
  return map;
};

const combineKeyMaps = keyMaps => {
  const map = {};
  Object.keys(keyMaps).forEach(key => {
    map[key] = (editorState, dispatch) => {
      for (let i = 0; i < keyMaps[key].length; i++) {
        if (keyMaps[key][i](editorState, dispatch)) {
          break;
        }
      }
    };
  });
  return map;
};

const commonKeyMap = {
  "Mod-a": (editorState, dispatch) => {
    const { tr, doc } = editorState;
    dispatch(
      tr.setSelection(
        new TextSelection(doc.resolve(0), doc.resolve(doc.content.size))
      )
    );
    return true;
  }
};

export const buildKeymap = plugins => {
  let combinedMap = {};
  plugins.forEach(plugin => {
    if (plugin) {
      combinedMap = addKeyMaps(combinedMap, plugin.keymaps);
    }
  });
  combinedMap = addKeyMaps(combinedMap, commonKeyMap);
  combinedMap = addKeyMaps(combinedMap, baseKeymap);
  combinedMap = combineKeyMaps(combinedMap);
  return new keymap(combinedMap);
};

// future: in plugins add priority to keymaps
