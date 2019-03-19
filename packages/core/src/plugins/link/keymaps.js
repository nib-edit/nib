const showLinkToolbar = () => (state, dispatch) => {
  dispatch(state.tr.setMeta("SHOW_LINK_TOOLBAR", true));
};

export default {
  "mod-k": (state, dispatch) => showLinkToolbar()(state, dispatch)
};

export const KeymapInfo = {
  link: { key: "mod-K", label: "Link" }
};
