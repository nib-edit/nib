import * as React from 'react';

import { ToolbarButton, Icon } from 'nib-ui';

import formatKeymap from '../../utils/format-keymap';
import { usePMStateContext } from '../../context/pm-state/index';

import { blockquotePluginKey } from './plugin';
import { KeymapInfo } from './keymaps';
import { wrapLiftBlockquote } from './commands';

export default () => {
  const { pmstate } = usePMStateContext();
  if (!pmstate) return null;
  const { pmview } = pmstate;
  if (!pmview) return null;

  const wrapInBlockquote = () => {
    const { state, dispatch } = pmview;
    wrapLiftBlockquote(state, dispatch);
  };

  const isBlockquoteNodePresent = () => {
    const { state } = pmview;
    const { blockquoteNode } = blockquotePluginKey.getState(state);
    return !!blockquoteNode;
  };

  const blockquotePresent = isBlockquoteNodePresent();
  return (
    <ToolbarButton
      onClick={wrapInBlockquote}
      selected={blockquotePresent}
      title={formatKeymap(KeymapInfo.insertBlockquote)}
    >
      <Icon name="blockquote" selected={blockquotePresent} />
    </ToolbarButton>
  );
};
