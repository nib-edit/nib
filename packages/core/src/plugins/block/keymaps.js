import { setBlockType } from "prosemirror-commands";

const changeBlockType = (blockTypeName, attrs) => (editorState, dispatch) => {
  const blockType = editorState.schema.nodes[blockTypeName];
  return setBlockType(blockType, attrs)(editorState, dispatch);
};

export default {
  "mod-alt-0": (editorState, dispatch) =>
    changeBlockType("paragraph")(editorState, dispatch),
  "mod-alt-1": (editorState, dispatch) =>
    changeBlockType("heading", { level: 1 })(editorState, dispatch),
  "mod-alt-2": (editorState, dispatch) =>
    changeBlockType("heading", { level: 2 })(editorState, dispatch),
  "mod-alt-3": (editorState, dispatch) =>
    changeBlockType("heading", { level: 3 })(editorState, dispatch),
  "mod-alt-4": (editorState, dispatch) =>
    changeBlockType("heading", { level: 4 })(editorState, dispatch),
  "mod-alt-5": (editorState, dispatch) =>
    changeBlockType("heading", { level: 5 })(editorState, dispatch),
  "mod-alt-6": (editorState, dispatch) =>
    changeBlockType("heading", { level: 6 })(editorState, dispatch)
};
