import * as React from 'react';
import { FunctionComponent } from 'react';
import { undo, redo } from 'prosemirror-history';

import { ToolbarButton, Icon } from 'nib-ui';

import formatKeymap from '../../utils/format-keymap';
import { PMStateConsumer } from '../../context/pm-state';
import { ProsemirrorEditorState } from '../../types/prosemirror';
import { KeymapInfo } from './keymaps';

interface ToolbarComponentProps {
  pmstate: ProsemirrorEditorState;
}

const ToolbarComponent: FunctionComponent<ToolbarComponentProps> = ({
  pmstate,
}) => {
  const undoState = () => {
    const { state, dispatch } = pmstate.pmview;
    undo(state, dispatch);
  };

  const redoState = () => {
    const { state, dispatch } = pmstate.pmview;
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

export default (props: any) => (
  <PMStateConsumer>
    {({ pmstate }) => <ToolbarComponent pmstate={pmstate} {...props} />}
  </PMStateConsumer>
);
