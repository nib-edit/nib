import React, { Component } from "react";
import styled from "@emotion/styled";

const ARROW_HEIGHT = 6;

const isSamePos = (oldPos, newPos) => {
  if (!oldPos) return false;
  if (
    oldPos.height !== newPos.height ||
    oldPos.left !== newPos.left ||
    oldPos.offsetTop !== newPos.offsetTop
  )
    return false;
  return true;
};

// Note: current left alignment does not take care of padding of section,
// this can be improved in future.
const getPosition = (marker, modalElm, editorWrapper) => {
  const markerDim = marker.getBoundingClientRect();
  const wrapperRefDim = editorWrapper.getBoundingClientRect();
  const modalWidth = modalElm ? modalElm.getBoundingClientRect().width : 0;

  let left = -(wrapperRefDim.left - markerDim.left);
  left += (markerDim.width - modalWidth) / 2;

  let arrowLeft;
  if (left < 0) {
    arrowLeft = Math.abs(left) > modalWidth / 2 - 10 ? left + 5 : left;
    left = -1;
  } else if (left + modalWidth > wrapperRefDim.width) {
    arrowLeft = left + modalWidth - wrapperRefDim.width;
    left = wrapperRefDim.width - modalWidth - 1;
  }
  let top = markerDim.y - wrapperRefDim.y + markerDim.height + ARROW_HEIGHT;

  return { modalPosition: { top, left }, arrowPosition: { left: arrowLeft } };
};

export default class Modal extends Component {
  wrapperRef = React.createRef();
  state = { position: { modalPosition: undefined, arrowPosition: undefined } };

  componentDidMount() {
    window.addEventListener("mousedown", this.handleMouseDown);
    const { marker, editorWrapper } = this.props;
    if (!marker) return;
    const oldPos = this.markerPos;
    const markerDim = marker.getBoundingClientRect();
    this.markerPos = {
      height: markerDim.height,
      left: markerDim.left,
      offsetTop: marker.offsetTop
    };
    if (isSamePos(oldPos, this.markerPos) && this.state.position) return;
    this.setState({
      ...getPosition(marker, this.wrapperRef.current, editorWrapper.current)
    });
  }

  componentWillUnmount = () => {
    window.removeEventListener("mousedown", this.handleMouseDown);
  };

  handleMouseDown = () => {
    if (
      this.wrapperRef.current &&
      !this.wrapperRef.current.contains(event.target) &&
      this.props.closeModal
    )
      this.props.closeModal();
  };

  onMouseDown = () => {
    this.active = true;
  };

  onKeyDown = e => {
    if (e.key === "Tab") this.active = true;
  };

  onFocus = () => {
    if (this.active) this.active = false;
  };

  onBlur = () => {
    if (this.active) this.active = false;
    else this.props.closeModal();
  };

  render() {
    const { marker, children } = this.props;
    if (!marker) return null;
    const { modalPosition = {}, arrowPosition = {} } = this.state;

    return (
      <Wrapper
        marker={marker}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onKeyDown={this.onKeyDown}
        onMouseDown={this.onMouseDown}
        ref={this.wrapperRef}
        style={modalPosition}
        tabIndex={-1}
      >
        <Arrow left={arrowPosition.left} />
        {children}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  position: absolute;

  background-color: ${({ theme }) => theme.modal.backgroundColor};
  color: ${({ theme }) => theme.modal.color};

  border-bottom: ${({ theme }) => theme.modal.borderBottom};
  border-left: ${({ theme }) => theme.modal.borderLeft};
  border-right: ${({ theme }) => theme.modal.borderRight};
  border-top: ${({ theme }) => theme.modal.borderTop};

  border-bottom-left-radius: ${({ theme }) =>
    theme.modal.borderBottomLeftRadius};
  border-bottom-right-radius: ${({ theme }) =>
    theme.modal.borderBottomLeftRadius};
  border-top-left-radius: ${({ theme }) => theme.modal.borderTopLeftRadius};
  border-top-right-radius: ${({ theme }) => theme.modal.borderTopLeftRadius};

  box-shadow: ${({ theme }) => theme.modal.boxShadow};

  font-weight: ${({ theme }) => theme.modal.fontWeight};

  :focus {
    outline: none;
  }
`;

const Arrow = styled.div`
  position: absolute;
  top: -6px;
  left: ${({ left = 0 }) => `calc(50% + ${left - 6}px)`};
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid ${({ theme }) => theme.modal.arrowBorderColor};
  &:after,
  &:before {
    border: solid transparent;
    content: " ";
    position: absolute;
  }
  &:after {
    border-bottom-color: ${({ theme }) => theme.modal.arrowBackgroundColor};
    border-width: 6px;
    margin-top: -5px;
    left: -6px;
  }
`;

// Improvements:
// 1. Fix arrow positioning when left is changed to take care of overflow.
// 2. Fix positioning when toolbar is at extreme bottom.

// todo: re-position modal on update
// todo: esc to close modals
// todo: fix warnings
