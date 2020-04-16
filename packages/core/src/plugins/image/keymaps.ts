import { ProsemirrorCommand } from '../../types/prosemirror';

const showImageModal: ProsemirrorCommand = (state, dispatch) => {
  dispatch(state.tr.setMeta('show-image-modal', true));
  return true;
};

export default () => ({
  'Mod-p': showImageModal,
});

export const KeymapInfo = {
  image: { key: 'Mod-P', label: 'Image' },
};
