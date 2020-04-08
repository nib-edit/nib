import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { ToolbarButton, Icon } from 'nib-ui';

import formatKeymap from '../../utils/format-keymap';
import { PMStateConsumer } from '../../context/pm-state';
import { imagePluginKey } from './plugin';
import ImageModal from './modals';
import { KeymapInfo } from './keymaps';

class ToolbarComponent extends PureComponent {
  showModal = () => {
    const { pmstate } = this.props;
    const { pmview } = pmstate;
    const { state, dispatch } = pmview;
    dispatch(state.tr.setMeta('show-image-modal', true));
  };

  hideModal = () => {
    const { pmstate } = this.props;
    const { pmview } = pmstate;
    const { state, dispatch } = pmview;
    dispatch(state.tr.setMeta('show-image-modal', false));
  };

  checkShowModal = () => {
    const { pmstate } = this.props;
    const { pmview } = pmstate;
    if (!pmview) return false;
    const { state } = pmview;
    const imagePluginState = imagePluginKey.getState(state);
    return imagePluginState.showImageModal;
  };

  isImageSelected = () => {
    const { pmstate } = this.props;
    const { pmview } = pmstate;
    if (!pmview) return false;
    const { state } = pmview;
    const imagePluginState = imagePluginKey.getState(state);
    return imagePluginState.isImageSelected;
  };

  render() {
    const { pmstate } = this.props;
    const showModal = this.checkShowModal();
    return (
      <>
        <ToolbarButton
          onClick={this.showModal}
          title={formatKeymap(KeymapInfo.image)}
        >
          <Icon name="image" selected={this.isImageSelected()} />
        </ToolbarButton>
        {showModal && (
          <ImageModal pmstate={pmstate} hideModal={this.hideModal} />
        )}
      </>
    );
  }
}

ToolbarComponent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  pmstate: PropTypes.object.isRequired,
};

export default (props) => (
  <PMStateConsumer>
    {({ pmstate }) => <ToolbarComponent pmstate={pmstate} {...props} />}
  </PMStateConsumer>
);
