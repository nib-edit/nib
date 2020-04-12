import * as React from 'react';
import { ToolbarButton, Icon } from 'nib-ui';

import formatKeymap from '../../utils/format-keymap';
import { usePMStateContext } from '../../context/pm-state/index';

import ImageModal from './modals';
import { KeymapInfo } from './keymaps';
import { imagePluginKey } from './plugin';

export default () => {
  const { pmstate } = usePMStateContext();
  if (!pmstate) return null;

  const { pmview } = pmstate;
  if (!pmview) return null;

  const showModal = () => {
    const { state, dispatch } = pmview;
    dispatch(state.tr.setMeta('show-image-modal', true));
  };

  const hideModal = () => {
    const { state, dispatch } = pmview;
    dispatch(state.tr.setMeta('show-image-modal', false));
  };

  const checkShowModal = () =>
    imagePluginKey.getState(pmview.state).showImageModal;

  const isImageSelected = () =>
    imagePluginKey.getState(pmview.state).isImageSelected;

  return (
    <>
      <ToolbarButton
        disabled={isImageSelected()}
        onClick={showModal}
        title={formatKeymap(KeymapInfo.image)}
      >
        <Icon name="image" selected={isImageSelected()} />
      </ToolbarButton>
      {checkShowModal() && <ImageModal hideModal={hideModal} />}
    </>
  );
};
