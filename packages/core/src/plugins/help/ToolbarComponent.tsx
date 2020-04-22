import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import { ToolbarButton, Icon } from 'nib-ui';

import formatKeymap from '../../utils/format-keymap';
import { usePMStateContext } from '../../context/pm-state/index';

import Modal from './Modal';
import { KeymapInfo } from './keymaps';
import { helpPluginKey } from './plugin';

export default () => {
  const { pmstate } = usePMStateContext();
  if (!pmstate) return null;
  const { pmview } = pmstate;
  if (!pmview) return null;

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const { state } = pmview;
    const pluginShowModal = helpPluginKey.getState(state).showHelpModal;
    // eslint-disable-next-line react/no-did-update-set-state
    if (pluginShowModal) setShowModal(pluginShowModal);
  });

  const hideModal = () => {
    const { state, dispatch } = pmview;
    setShowModal(false);
    dispatch(state.tr.setMeta('show-help-modal', false));
  };

  return (
    <>
      <StyledButton
        onClick={() => setShowModal(true)}
        title={formatKeymap(KeymapInfo.help)}
      >
        <Icon name="question" />
      </StyledButton>
      {showModal && <Modal hideModal={hideModal} />}
    </>
  );
};

const StyledButton = styled(ToolbarButton)({ marginLeft: 8 });
