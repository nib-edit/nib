import PropTypes from "prop-types";
import React, {Component} from "react";
import styled from "@emotion/styled";

const ARROW_HEIGHT = 6;
const ARROW_MIN_DISTANCE = 10;
const BLOCK_HEIGHT = 20;
const OVERLAY_DISTANCE_FROM_BLOCK = 4;
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
const getPosition = (marker, overlayElm, editorWrapper) => {
  const markerDim = marker.getBoundingClientRect();
  const wrapperDim = editorWrapper.getBoundingClientRect();
  const {width: overlayWidth = 0, height: overlayHeight = 0} = overlayElm
    ? overlayElm.getBoundingClientRect()
    : {};

  let arrowDir = "TOP";
  // Finding left offset of overlay
  let left = markerDim.left - wrapperDim.left;
  // Center aligning overlay on marker element
  left += (markerDim.width - overlayWidth) / 2;

  let arrowLeft;
  if (left < 3) {
    arrowLeft = left + ARROW_MIN_DISTANCE;
    left = MIN_LEFT;
  } else if (left + overlayWidth > wrapperDim.width) {
    arrowLeft = left + overlayWidth - wrapperDim.width;
    left = wrapperDim.width - overlayWidth;
    if (left < MIN_LEFT) left = MIN_LEFT;
  }

  let top =
    markerDim.y -
    wrapperDim.y +
    (markerDim.height || BLOCK_HEIGHT) +
    OVERLAY_DISTANCE_FROM_BLOCK +
    ARROW_HEIGHT;
  if (top + overlayHeight > wrapperDim.height) {
    const newTop =
      markerDim.y -
      wrapperDim.y -
      ARROW_HEIGHT -
      overlayHeight -
      OVERLAY_DISTANCE_FROM_BLOCK;
    if (newTop > 0) {
      arrowDir = "BOTTOM";
      top = newTop;
    }
  }

  return {
    overlayPosition: {top, left},
    arrowPosition: {left: arrowLeft, dir: arrowDir}
  };
};

export default class Overlay extends Component {
  wrapperRef = React.createRef();
  state = {overlayPosition: {}, arrowPosition: {dir: "TOP"}};

  static propTypes = {
    className: PropTypes.string,
    closeOverlay: PropTypes.func,
    editorWrapper: PropTypes.object,
    marker: PropTypes.object,
    render: PropTypes.func
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyPress);
    window.addEventListener("mousedown", this.handleWindowMouseDown);
    const {marker, editorWrapper} = this.props;
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
    const {marker, editorWrapper} = this.props;
    if (!marker) return;
    const oldPos = this.markerPos;
    const markerDim = marker.getBoundingClientRect();
    this.markerPos = {
      height: markerDim.height,
      left: markerDim.left,
      offsetTop: marker.offsetTop,
      width: markerDim.width
    };
    if (isSamePos(oldPos, this.markerPos) && this.state.overlayPosition) return;
    this.setState({
      ...getPosition(marker, this.wrapperRef.current, editorWrapper.current)
    });
  }

  handleKeyPress = evt => {
    if (evt.key === "Escape") this.props.closeOverlay();
  };

  handleWindowMouseDown = evt => {
    const wrapper = this.wrapperRef.current;
    if (!wrapper.contains(evt.target)) this.props.closeOverlay();
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
    else this.props.closeOverlay();
  };

  render() {
    const {className, marker, render} = this.props;
    if (!marker) return null;
    const {overlayPosition, arrowPosition} = this.state;

    return (
      <Wrapper
        className={className}
        marker={marker}
        handleBlur={this.handleBlur}
        handleFocus={this.handleFocus}
        handleKeyDown={this.handleKeyDown}
        handleMouseDown={this.handleMouseDown}
        ref={this.wrapperRef}
        style={overlayPosition}
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

  background-color: ${({theme}) => theme.overlay.backgroundColor};
  color: ${({theme}) => theme.overlay.color};

  border-bottom: ${({theme}) => theme.overlay.borderBottom};
  border-left: ${({theme}) => theme.overlay.borderLeft};
  border-right: ${({theme}) => theme.overlay.borderRight};
  border-top: ${({theme}) => theme.overlay.borderTop};
  border-bottom-left-radius: ${({theme}) =>
    theme.overlay.borderBottomLeftRadius};
  border-bottom-right-radius: ${({theme}) =>
    theme.overlay.borderBottomLeftRadius};
  border-top-left-radius: ${({theme}) => theme.overlay.borderTopLeftRadius};
  border-top-right-radius: ${({theme}) => theme.overlay.borderTopLeftRadius};

  box-shadow: ${({theme}) => theme.overlay.boxShadow};

  font-weight: ${({theme}) => theme.overlay.fontWeight};

  :focus {
    outline: none;
  }
`;

const ArrowTop = styled.div`
  background: ${({theme}) => theme.overlay.backgroundColor};
  border-left: 1px solid ${({theme}) => theme.overlay.arrowBorderColor};
  border-top: 1px solid ${({theme}) => theme.overlay.arrowBorderColor};
  height: 10px;
  left: ${({left = 0}) => `calc(50% + ${left - ARROW_HEIGHT}px)`};
  position: absolute;
  top: -6px;
  transform: rotate(45deg);
  width: 10px;
`;

const ArrowBottom = styled.div`
  background: ${({theme}) => theme.overlay.backgroundColor};
  border-right: 1px solid ${({theme}) => theme.overlay.arrowBorderColor};
  border-bottom: 1px solid ${({theme}) => theme.overlay.arrowBorderColor};
  height: 10px;
  left: ${({left = 0}) => `calc(50% + ${left - ARROW_HEIGHT}px)`};
  position: absolute;
  bottom: -6px;
  transform: rotate(45deg);
  width: 10px;
`;

// todo: use nice icons in place of text buttons on link overlays,
// Buttons are kind of misleading and do not look clikable.
