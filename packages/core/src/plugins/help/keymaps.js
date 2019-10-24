const showHelp = () => (state, dispatch) => {
  dispatch(state.tr.setMeta("show-help-modal", true));
};

export default {
  "Mod-/": (state, dispatch) => showHelp()(state, dispatch)
};

export const KeymapInfo = {
  help: { key: "Mod-/", label: "Help" }
};
