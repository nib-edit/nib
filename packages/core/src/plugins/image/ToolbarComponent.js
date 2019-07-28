import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { ToolbarButton, Icon } from "nib-ui";

import ImageModal from "./modals";
import { PMStateConsumer } from "../../context/pm-state";

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
    const { pmstate } = this.props;
    const { showModal } = this.state;
    return (
      <>
        <ToolbarButton onClick={this.showModal} title="Image">
          <Icon name="Image" />
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
  pmstate: PropTypes.object.isRequired
};

export default props => (
  <PMStateConsumer>
    {pmstate => <ToolbarComponent pmstate={pmstate} {...props} />}
  </PMStateConsumer>
);
