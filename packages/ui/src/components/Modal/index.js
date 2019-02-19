import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "@emotion/styled";
import { EFAULT } from "constants";

const ARROW_HEIGHT = 6;
const ARROW_MIN_DISTANCE = 10;
const BLOCK_HEIGHT = 20;
const MODAL_DISTANCE_FROM_BLOCK = 4;
const MIN_LEFT = 2;

const isSamePos = (oldPos, newPos) => {
  if (!oldPos) return false;
  if (
    oldPos.height !== newPos.height ||
    oldPos.left !== newPos.left ||
    oldPos.offsetTop !== newPos.offsetTop ||
    oldPos.width !== newPos.width
  )
    return false;
  return true;
};

// Note: current left alignment does not take care of padding of section,
// this can be improved in future.
const getPosition = (marker, modalElm, editorWrapper) => {
  const markerDim = marker.getBoundingClientRect();
  const wrapperDim = editorWrapper.getBoundingClientRect();
  const { width: modalWidth = 0, height: modalHeight = 0 } = modalElm
    ? modalElm.getBoundingClientRect()
    : {};

  let arrowDir = "TOP";
  // Finding left offset of modal
  let left = markerDim.left - wrapperDim.left;
  // Center aligning modal on marker element
  left += (markerDim.width - modalWidth) / 2;

  let arrowLeft;
  if (left < 3) {
    arrowLeft = left + ARROW_MIN_DISTANCE;
    left = MIN_LEFT;
  } else if (left + modalWidth > wrapperDim.width) {
    arrowLeft = left + modalWidth - wrapperDim.width;
    left = wrapperDim.width - modalWidth;
    if (left < MIN_LEFT) left = MIN_LEFT;
  }

  let top =
    markerDim.y -
    wrapperDim.y +
    (markerDim.height || BLOCK_HEIGHT) +
    MODAL_DISTANCE_FROM_BLOCK +
    ARROW_HEIGHT;
  if (top + modalHeight > wrapperDim.height) {
    const newTop =
      markerDim.y -
      wrapperDim.y -
      ARROW_HEIGHT -
      modalHeight -
      MODAL_DISTANCE_FROM_BLOCK;
    if (newTop > 0) {
      arrowDir = "BOTTOM";
      top = newTop;
    }
  }

  return {
    modalPosition: { top, left },
    arrowPosition: { left: arrowLeft, dir: arrowDir }
  };
};

export default class Modal extends Component {
  wrapperRef = React.createRef();
  state = { modalPosition: {}, arrowPosition: { dir: "TOP" } };

  static propTypes = {
    className: PropTypes.string,
    closeModal: PropTypes.func,
    editorWrapper: PropTypes.object,
    marker: PropTypes.object,
    render: PropTypes.func
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyPress);
    window.addEventListener("mousedown", this.handleWindowMouseDown);
    const { marker, editorWrapper } = this.props;
    if (marker) {
      this.setState({
        ...getPosition(marker, this.wrapperRef.current, editorWrapper.current)
      });
    }
  }

  componentWillUnmount = () => {
    window.removeEventListener("keydown", this.handleKeyPress);
    window.removeEventListener("mousedown", this.handleWindowMouseDown);
  };

  componentDidUpdate() {
    const { marker, editorWrapper } = this.props;
    if (!marker) return;
    const oldPos = this.markerPos;
    const markerDim = marker.getBoundingClientRect();
    this.markerPos = {
      height: markerDim.height,
      left: markerDim.left,
      offsetTop: marker.offsetTop,
      width: markerDim.width
    };
    if (isSamePos(oldPos, this.markerPos) && this.state.modalPosition) return;
    this.setState({
      ...getPosition(marker, this.wrapperRef.current, editorWrapper.current)
    });
  }

  handleKeyPress = evt => {
    if (evt.key === "Escape") this.props.closeModal();
  };

  handleWindowMouseDown = evt => {
    const wrapper = this.wrapperRef.current;
    if (!wrapper.contains(evt.target)) this.props.closeModal();
  };

  handleMouseDown = () => {
    this.active = true;
  };

  handleKeyDown = e => {
    if (e.key === "Tab") this.active = true;
  };

  handleFocus = () => {
    if (this.active) this.active = false;
  };

  handleBlur = () => {
    if (this.active) this.active = false;
    else this.props.closeModal();
  };

  render() {
    const { className, marker, render } = this.props;
    if (!marker) return null;
    const { modalPosition, arrowPosition } = this.state;

    return (
      <Wrapper
        className={className}
        marker={marker}
        handleBlur={this.handleBlur}
        handleFocus={this.handleFocus}
        handleKeyDown={this.handleKeyDown}
        handleMouseDown={this.handleMouseDown}
        ref={this.wrapperRef}
        style={modalPosition}
        tabIndex={-1}
      >
        {arrowPosition.dir === "TOP" ? (
          <ArrowTop left={arrowPosition.left} />
        ) : (
          <ArrowBottom left={arrowPosition.left} />
        )}
        {render()}
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

const ArrowTop = styled.div`
  background: ${({ theme }) => theme.modal.backgroundColor};
  border-left: 1px solid ${({ theme }) => theme.modal.arrowBorderColor};
  border-top: 1px solid ${({ theme }) => theme.modal.arrowBorderColor};
  height: 10px;
  left: ${({ left = 0 }) => `calc(50% + ${left - ARROW_HEIGHT}px)`};
  position: absolute;
  top: -7px;
  transform: rotate(45deg);
  width: 10px;
`;

const ArrowBottom = styled.div`
  background: ${({ theme }) => theme.modal.backgroundColor};
  border-right: 1px solid ${({ theme }) => theme.modal.arrowBorderColor};
  border-bottom: 1px solid ${({ theme }) => theme.modal.arrowBorderColor};
  height: 10px;
  left: ${({ left = 0 }) => `calc(50% + ${left - ARROW_HEIGHT}px)`};
  position: absolute;
  bottom: -7px;
  transform: rotate(45deg);
  width: 10px;
`;

// todo: check complexity that heading styles can create
