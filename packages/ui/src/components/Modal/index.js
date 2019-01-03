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
const getPosition = (marker, modalElm) => {
  const markerDim = marker.getBoundingClientRect();
  const markerParentDim = marker.offsetParent.getBoundingClientRect();
  const modalWidth = modalElm ? modalElm.getBoundingClientRect().width : 0;

  // Line below will find offsetLeft of editor.
  let left = -(markerParentDim.left - markerDim.left);

  // Line below will align the modal in middle of the editor.
  left += (markerDim.width - modalWidth) / 2;

  // Lines below will align modal to left or right of editor if there is a overflow.
  if (left < 0) left = 0;
  else if (left + modalWidth > markerParentDim.width)
    left = markerParentDim.width - modalWidth;
  console.log("***", marker.clientHeight, marker.parentElement.clientHeight);
  let top =
    marker.offsetTop +
    (marker.clientHeight || marker.parentElement.clientHeight) +
    ARROW_HEIGHT;

  return { top, left };
};

export default class Modal extends Component {
  wrapperRef = React.createRef();
  state = { position: {} };

  componentDidMount = () => {
    window.addEventListener("mousedown", this.handleMouseDown);
  };

  handleMouseDown = () => {
    if (
      this.wrapperRef.current &&
      !this.wrapperRef.current.contains(event.target)
    )
      this.props.closeModal();
  };

  componentWillUnmount = () => {
    window.removeEventListener("mousedown", this.handleMouseDown);
  };

  componentDidUpdate() {
    const { marker } = this.props;
    if (!marker) return;
    const oldPos = this.markerPos;
    const markerDim = marker.getBoundingClientRect();
    this.markerPos = {
      height: markerDim.height,
      left: markerDim.left,
      offsetTop: marker.offsetTop
    };
    if (isSamePos(oldPos, this.markerPos)) return;
    this.setState({
      position: getPosition(marker, this.wrapperRef.current)
    });
  }

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
    const { position } = this.state;
    if (!marker) return null;

    return (
      <Wrapper
        marker={marker}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onKeyDown={this.onKeyDown}
        onMouseDown={this.onMouseDown}
        ref={this.wrapperRef}
        style={position}
        tabIndex={-1}
      >
        <Arrow />
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

  font-weight: ${({ theme }) => theme.modal.fontWeight};

  :focus {
    outline: none;
  }
`;

const Arrow = styled.div`
  position: absolute;
  top: -6px;
  left: calc(50% - 4px);
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
