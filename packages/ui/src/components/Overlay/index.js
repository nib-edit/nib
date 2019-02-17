import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import styled from "@emotion/styled";

class Overlay extends PureComponent {
  static propTypes = {
    hideOverlay: PropTypes.func,
    render: PropTypes.func
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount = () => {
    window.removeEventListener("keydown", this.handleKeyPress);
  };

  handleKeyPress = evt => {
    if (evt.key === "Escape") this.props.hideOverlay();
  };

  handleMouseDown = evt => {
    if (evt.button === 0) {
      this.props.hideOverlay();
    }
  };

  stopPropagation = evt => evt.stopPropagation();

  render() {
    const { render } = this.props;
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
  background-color: ${({ theme }) => theme.overlay.backgroundColor};
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
  border-radius: ${({ theme }) => theme.overlay.contentBorderRadius};
  box-shadow: ${({ theme }) => theme.overlay.contentBoxShadow};
`;

export default Overlay;
