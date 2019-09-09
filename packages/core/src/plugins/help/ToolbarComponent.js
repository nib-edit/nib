import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import styled from "@emotion/styled";

import { ToolbarButton, Icon } from "nib-ui";

import formatKeymap from "../../utils/format-keymap";
import { PMStateConsumer } from "../../context/pm-state";
import { KeymapInfo } from "./keymaps";
import Modal from "./Modal";
import { helpPluginKey } from "./plugin";

class ToolbarComponent extends PureComponent {
  state = {
    showModal: false
  };

  componentDidUpdate() {
    const { pmstate } = this.props;
    const { pmview } = pmstate;
    const { state } = pmview;
    const showModal = helpPluginKey.getState(state).showHelpModal;
    // eslint-disable-next-line react/no-did-update-set-state
    if (showModal) this.setState({ showModal });
  }

  showModal = () => {
    this.setState({ showModal: true });
  };

  hideModal = () => {
    const { pmstate } = this.props;
    const { pmview } = pmstate;
    const { state, dispatch } = pmview;
    this.setState({ showModal: false });
    dispatch(state.tr.setMeta("show-help-modal", false));
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
