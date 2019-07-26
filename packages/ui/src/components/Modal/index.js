import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import styled from "@emotion/styled";

import Icon from "../Icon";

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

  handleTouchStart = evt => {
    if (evt.targetTouches.length === 1) this.props.hideModal();
  };

  stopPropagation = evt => evt.stopPropagation();

  render() {
    const { render, title, hideModal } = this.props;
    return (
      <Wrapper
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleTouchStart}
      >
        <InnerWrapper
          onMouseDown={this.stopPropagation}
          onTouchStart={this.stopPropagation}
          onClick={this.stopPropagation}
        >
          <Header>
            <Title>{title}</Title>
            <StyledIcon name="Cross" onClick={hideModal} />
          </Header>
          <MainSection>{render()}</MainSection>
        </InnerWrapper>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.modal.modalBackgroundColor};
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
  width: 75%;
  height: 75%;
  max-height: 750px;
  max-width: 750px;
  background-color: ${({ theme }) => theme.modal.backgroundColor};
  color: ${({ theme }) => theme.modal.color};
  border-radius: ${({ theme }) => theme.modal.contentBorderRadius};
  box-shadow: ${({ theme }) => theme.modal.contentBoxShadow};
  font-size: 16px;
  border-radius: 2px;
`;

const Header = styled.div`
  box-shadow: rgb(235, 236, 240) 0px 1px 0px;
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-size: 20px;
`;

const SubTitle = styled.div`
  font-size: 18px;
  padding: 0px 24px 10px;
`;

const StyledIcon = styled(Icon)`
  cursor: pointer;
`;

const MainSection = styled.div`
  height: calc(100% - 102px);
  padding: 24px 0;
`;

export default Modal;
