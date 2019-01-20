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
      let result = false;
      for (let i = 0; i < keyMaps[key].length; i++) {
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

const selectAll = () => (state, dispatch) => {
  const { tr, doc } = state;
  dispatch(
    tr.setSelection(
      new TextSelection(doc.resolve(0), doc.resolve(doc.content.size))
    )
  );
  return true;
};

//todo: merge this to common plugin
const commonKeyMap = {
  "Mod-a": (editorState, dispatch) => selectAll()(editorState, dispatch)
};

export const buildKeymap = plugins => {
  let combinedMap = {};
  plugins.forEach(plugin => {
    if (plugin && plugin.keymaps) {
      combinedMap = addKeyMaps(combinedMap, plugin.keymaps);
    }
  });
  combinedMap = addKeyMaps(combinedMap, commonKeyMap);
  combinedMap = addKeyMaps(combinedMap, baseKeymap);
  combinedMap = combineKeyMaps(combinedMap);
  return new keymap(combinedMap);
};

// future: in plugins add priority to keymaps
