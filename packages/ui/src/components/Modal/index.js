import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import styled from "@emotion/styled";

class Modal extends PureComponent {
  static propTypes = {
    hideModal: PropTypes.func,
    render: PropTypes.func
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount = () => {
    window.removeEventListener("keydown", this.handleKeyPress);
  };

  handleKeyPress = evt => {
    if (evt.key === "Escape") this.props.hideModal();
  };

  handleMouseDown = evt => {
    if (evt.button === 0) {
      this.props.hideModal();
    }
  };

  stopPropagation = evt => evt.stopPropagation();

  render() {
    const {render} = this.props;
    return (
      <Wrapper onMouseDown={this.handleMouseDown}>
        <InnerWrapper onMouseDown={this.stopPropagation}>
          {render()}
        </InnerWrapper>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  align-items: center;
  background-color: ${({theme}) => theme.modal.modalBackgroundColor};
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
`;

const InnerWrapper = styled.div`
  background-color: ${({theme}) => theme.modal.backgroundColor};
  color: ${({theme}) => theme.modal.color};
  border-radius: ${({theme}) => theme.modal.contentBorderRadius};
  box-shadow: ${({theme}) => theme.modal.contentBoxShadow};
`;

export default Modal;
