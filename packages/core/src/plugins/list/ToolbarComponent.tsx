import * as React from 'react';

import { ToolbarButton, Icon } from 'nib-ui';

import formatKeymap from '../../utils/format-keymap';
import { KeymapInfo } from './keymaps';
import { listPluginKey } from './plugin';
import { toggleListCmd } from './commands';
import { usePMStateContext } from '../../context/pm-state/index';

export default () => {
  const { pmstate } = usePMStateContext();
  if (!pmstate) return null;

  const { pmview } = pmstate;
  if (!pmview) return null;

  const toggleList = (evt: MouseEvent) => {
    const listType = (evt.currentTarget as HTMLButtonElement).getAttribute(
      'name'
    );
    const { state, dispatch } = pmview;
    toggleListCmd(listType!, pmview)(state, dispatch);
  };

  const getSelectedListType = () => {
    const { state } = pmview;
    const pluginState = listPluginKey.getState(state);
    const selectedListType = pluginState && pluginState.selectedListType;
    return selectedListType && selectedListType.name;
  };

  const selectedListType = getSelectedListType();
  const bulletListActive = selectedListType === 'bulletList';
  const orderedListActive = selectedListType === 'orderedList';

  return (
    <>
      <ToolbarButton
        name="bulletList"
        onClick={toggleList}
        selected={bulletListActive}
        title={formatKeymap(KeymapInfo.bulletList)}
      >
        <Icon name="listBulleted" selected={bulletListActive} />
      </ToolbarButton>
      <ToolbarButton
        name="orderedList"
        onClick={toggleList}
        selected={orderedListActive}
        title={formatKeymap(KeymapInfo.orderedList)}
      >
        <Icon name="listNumbered" selected={orderedListActive} />
      </ToolbarButton>
    </>
  );
};
