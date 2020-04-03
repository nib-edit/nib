import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import { ToolbarButton, Icon } from 'nib-ui';

import formatKeymap from '../../utils/format-keymap';
import { PMStateConsumer } from '../../context/pm-state';

import { KeymapInfo } from './keymaps';
import { blockquotePluginKey } from './plugin';
import { liftBlockquoteCmd, wrapInBlockquoteCmd } from './commands';

class ToolbarComponent extends PureComponent {
  wrapInBlockquote = () => {
    const { pmstate } = this.props;
    const { pmview } = pmstate;
    const { state, dispatch } = pmview;
    const { blockquoteNode } = blockquotePluginKey.getState(state);
    if (blockquoteNode) liftBlockquoteCmd(state, dispatch);
    else wrapInBlockquoteCmd(state, dispatch);
  };

  isBlockquoteNodePresent = () => {
    const { pmstate } = this.props;
    const { pmview } = pmstate;
    if (!pmview) return false;
    const { state } = pmview;
    const { blockquoteNode } = blockquotePluginKey.getState(state);
    return !!blockquoteNode;
  };

  render() {
    const blockquotePresent = this.isBlockquoteNodePresent();
    return (
      <ToolbarButton
        onClick={this.wrapInBlockquote}
        selected={blockquotePresent}
        title={formatKeymap(KeymapInfo.insertBlockquote)}
      >
        <Icon name="blockquote" selected={blockquotePresent} />
      </ToolbarButton>
    );
  }
}

ToolbarComponent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  pmstate: PropTypes.object.isRequired,
};

export default props => (
  <PMStateConsumer>
    {({ pmstate }) => <ToolbarComponent pmstate={pmstate} {...props} />}
  </PMStateConsumer>
);
