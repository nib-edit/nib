import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { undo, redo } from 'prosemirror-history';

import { ToolbarButton, Icon } from 'nib-ui';

import formatKeymap from '../../utils/format-keymap';
import { PMStateConsumer } from '../../context/pm-state';
import { KeymapInfo } from './keymaps';

class ToolbarComponent extends PureComponent {
  undo = () => {
    const { pmstate } = this.props;
    const { state, dispatch } = pmstate.pmview;
    undo(state, dispatch);
  };

  redo = () => {
    const { pmstate } = this.props;
    const { state, dispatch } = pmstate.pmview;
    redo(state, dispatch);
  };

  render() {
    return (
      <>
        <ToolbarButton
          onClick={this.undo}
          title={formatKeymap(KeymapInfo.undo)}
        >
          <Icon name="undo" />
        </ToolbarButton>
        <ToolbarButton
          onClick={this.redo}
          title={formatKeymap(KeymapInfo.redo)}
        >
          <Icon name="redo" />
        </ToolbarButton>
      </>
    );
  }
}

ToolbarComponent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  pmstate: PropTypes.object.isRequired,
};

export default props => (
  <PMStateConsumer>
    {pmstate => <ToolbarComponent pmstate={pmstate} {...props} />}
  </PMStateConsumer>
);
