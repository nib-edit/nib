import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { ThemeProvider } from 'emotion-theming';

import { ToolbarButton, Icon } from 'nib-ui';

import { videoPluginKey } from './plugin';
import Modal from './modals';

class ToolbarComponent extends PureComponent {
  state = {
    showModal: false,
  };

  showModal = () => {
    this.setState({ showModal: true });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { showModal } = this.state;
    const { pmstate, theme } = this.props;
    const { pmview } = pmstate;
    if (!pmview) return null;

    const { state } = pmview;
    const {
      license_missing: licenseMissing,
      isVideoPresent,
    } = videoPluginKey.getState(state);
    if (licenseMissing || !theme) return null;
    return (
      <ThemeProvider theme={theme}>
        <ToolbarButton onClick={this.showModal} title="Video">
          <span className="video_toolbar_component">
            <Icon name="video" selected={isVideoPresent} />
          </span>
        </ToolbarButton>
        {showModal && <Modal pmstate={pmstate} hideModal={this.hideModal} />}
      </ThemeProvider>
    );
  }
}

ToolbarComponent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  pmstate: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  theme: PropTypes.object.isRequired,
};

export default ToolbarComponent;
