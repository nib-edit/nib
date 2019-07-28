import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import styled from "@emotion/styled";

import { ToolbarButton, Icon } from "nib-ui";

import formatKeymap from "../../utils/format-keymap";
import { PMStateConsumer } from "../../context/pm-state";
import { KeymapInfo } from "./keymaps";
import Modal from "./Modal";

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
        <StyledButton
          onClick={this.showModal}
          title={formatKeymap(KeymapInfo.help)}
        >
          <Icon name="question" />
        </StyledButton>
        {showModal && <Modal pmstate={pmstate} hideModal={this.hideModal} />}
      </>
    );
  }
}

ToolbarComponent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  pmstate: PropTypes.object.isRequired
};

const StyledButton = styled(ToolbarButton)({ marginLeft: 8 });

export default props => (
  <PMStateConsumer>
    {pmstate => <ToolbarComponent pmstate={pmstate} {...props} />}
  </PMStateConsumer>
);
