import { ProsemirrorCommand } from '../../types/prosemirror';
import { isImageSelected } from './utils';

const showImageModal: ProsemirrorCommand = (state, dispatch) => {
  if (isImageSelected(state)) return false;
  dispatch(state.tr.setMeta('show-image-modal', true));
  return true;
};

export default () => ({
  'Mod-p': showImageModal,
});

export const KeymapInfo = {
  image: { key: 'Mod-P', label: 'Image' },
};
