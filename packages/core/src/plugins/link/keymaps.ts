import { ProsemirrorCommand } from '../../types/prosemirror';
import { isLinkMarkActive } from './utils';

const showLinkToolbar: ProsemirrorCommand = (state, dispatch) => {
  if (isLinkMarkActive(state)) return false;
  dispatch(state.tr.setMeta('show-add-link-toolbar', true));
  return true;
};

export default () => ({
  'Mod-k': showLinkToolbar,
});

export const KeymapInfo = {
  link: { key: 'Mod-K', label: 'Link' },
};
