import * as React from 'react';
import { undo, redo } from 'prosemirror-history';

import { ToolbarButton, Icon } from 'nib-ui';

import formatKeymap from '../../utils/format-keymap';
import { usePMStateContext } from '../../context/pm-state/index';

import { KeymapInfo } from './keymaps';

export default () => {
  const { pmstate } = usePMStateContext();
  if (!pmstate) return null;
  const { pmview } = pmstate;
  if (!pmview) return null;

  const undoState = () => {
    const { state, dispatch } = pmview;
    undo(state, dispatch);
  };

  const redoState = () => {
    const { state, dispatch } = pmview;
    redo(state, dispatch);
  };

  return (
    <>
      <ToolbarButton onClick={undoState} title={formatKeymap(KeymapInfo.undo)}>
        <Icon name="undo" />
      </ToolbarButton>
      <ToolbarButton onClick={redoState} title={formatKeymap(KeymapInfo.redo)}>
        <Icon name="redo" />
      </ToolbarButton>
    </>
  );
};
