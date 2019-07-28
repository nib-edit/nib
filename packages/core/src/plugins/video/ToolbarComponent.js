import PropTypes from "prop-types";
import React, { PureComponent } from "react";

import { ToolbarButton, Icon } from "nib-ui";

import { PMStateConsumer } from "../../context/pm-state";
import Modal from "./modals";

class ToolbarComponent extends PureComponent {
  state = {
    showModal: false
  };

  showModal = () => {
    this.setState({ showModal: true });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { showModal } = this.state;
    const { pmstate } = this.props;
    return (
      <>
        <ToolbarButton onClick={this.showModal} title="Video">
          <span className="video_toolbar_component">
            <Icon name="Video" />
          </span>
        </ToolbarButton>
        {showModal && <Modal pmstate={pmstate} hideModal={this.hideModal} />}
      </>
    );
  }
}

ToolbarComponent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  pmstate: PropTypes.object.isRequired
};

export default props => (
  <PMStateConsumer>
    {pmstate => <ToolbarComponent pmstate={pmstate} {...props} />}
  </PMStateConsumer>
);
