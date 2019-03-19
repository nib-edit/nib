import { setBlockType } from "prosemirror-commands";

const changeBlockType = (blockTypeName, attrs) => (state, dispatch) => {
  const blockType = state.schema.nodes[blockTypeName];
  return setBlockType(blockType, attrs)(state, dispatch);
};

export default {
  "mod-alt-0": (state, dispatch) =>
    changeBlockType("paragraph")(state, dispatch),
  "mod-alt-1": (state, dispatch) =>
    changeBlockType("heading", { level: 1 })(state, dispatch),
  "mod-alt-2": (state, dispatch) =>
    changeBlockType("heading", { level: 2 })(state, dispatch),
  "mod-alt-3": (state, dispatch) =>
    changeBlockType("heading", { level: 3 })(state, dispatch),
  "mod-alt-4": (state, dispatch) =>
    changeBlockType("heading", { level: 4 })(state, dispatch),
  "mod-alt-5": (state, dispatch) =>
    changeBlockType("heading", { level: 5 })(state, dispatch),
  "mod-alt-6": (state, dispatch) =>
    changeBlockType("heading", { level: 6 })(state, dispatch)
};

export const KeymapInfo = {
  p: { key: "mod-alt-0", label: "Paragraph" },
  h1: { key: "mod-alt-1", label: "Heading 1" },
  h2: { key: "mod-alt-2", label: "Heading 2" },
  h3: { key: "mod-alt-3", label: "Heading 3" },
  h4: { key: "mod-alt-4", label: "Heading 4" },
  h5: { key: "mod-alt-5", label: "Heading 5" },
  h6: { key: "mod-alt-6", label: "Heading 6" }
};
