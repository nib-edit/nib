const showLinkToolbar = (state, dispatch) => {
  dispatch(state.tr.setMeta('show-add-link-toolbar', true));
};

export default () => ({
  'Mod-k': showLinkToolbar,
});

export const KeymapInfo = {
  link: { key: 'Mod-K', label: 'Link' },
};
