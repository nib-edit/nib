const showLinkToolbar = () => (state, dispatch) => {
  dispatch(state.tr.setMeta("show-add-link-toolbar", true));
};

export default {
  "Mod-k": (state, dispatch) => showLinkToolbar()(state, dispatch)
};

export const KeymapInfo = {
  link: { key: "Mod-K", label: "Link" }
};
