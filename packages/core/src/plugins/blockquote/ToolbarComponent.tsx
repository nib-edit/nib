import * as React from 'react';
import { FunctionComponent } from 'react';

import { ToolbarButton, Icon } from 'nib-ui';

import formatKeymap from '../../utils/format-keymap';
import { PMStateConsumer } from '../../context/pm-state';
import { ProsemirrorEditorState } from '../../types/prosemirror';

import { KeymapInfo } from './keymaps';
import { blockquotePluginKey } from './plugin';
import { wrapLiftBlockquote } from './commands';

interface ToolbarComponentProps {
  pmstate: ProsemirrorEditorState;
  config: { options: string; grouped: boolean };
}

const ToolbarComponent: FunctionComponent<ToolbarComponentProps> = (props) => {
  const wrapInBlockquote = () => {
    const { pmstate } = props;
    const { pmview } = pmstate;
    const { state, dispatch } = pmview;
    wrapLiftBlockquote(state, dispatch);
  };

  const isBlockquoteNodePresent = () => {
    const { pmstate } = props;
    const { pmview } = pmstate;
    if (!pmview) return false;
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

export default (props: any) => (
  <PMStateConsumer>
    {({ pmstate }) => <ToolbarComponent pmstate={pmstate} {...props} />}
  </PMStateConsumer>
);
