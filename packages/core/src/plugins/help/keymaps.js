const showHelp = () => (state, dispatch) => {
  dispatch(state.tr.setMeta("SHOW_HELP_OVERLAY", true));
};

export default {
  "mod-/": (state, dispatch) => showHelp()(state, dispatch)
};

export const KeymapInfo = {
  help: { key: "mod-/", label: "Help" }
};
