const insertHardBreak = () => (state, dispatch) => {
  const { hardBreak } = state.schema.nodes;
  dispatch(state.tr.replaceSelectionWith(hardBreak.create()));
};

export default {
  "shift-Enter": (state, dispatch) => insertHardBreak()(state, dispatch)
};

export const KeymapInfo = {
  help: { key: "shift-Enter", label: "Soft newline" }
};
