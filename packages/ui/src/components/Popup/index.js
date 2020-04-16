import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from '@emotion/styled';

import Closeable from '../Closeable';

const BLOCK_HEIGHT = 20;
const MIN_LEFT = 2;
const POPUP_DISTANCE_FROM_BLOCK = 1;

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
const getPosition = (marker, popupElm, editorWrapper, isScrolling) => {
  const markerDim = marker.getBoundingClientRect();
  const wrapperDim = editorWrapper.getBoundingClientRect();
  const { width: popupWidth = 0, height: popupHeight = 0 } = popupElm
    ? popupElm.getBoundingClientRect()
    : {};

  let left = markerDim.left - wrapperDim.left;
  // Center aligning popup on marker element
  left += (markerDim.width - popupWidth) / 2;

  if (left < 3) {
    left = MIN_LEFT;
  }
  if (markerDim.width > wrapperDim.width) {
    left = `calc(50% - ${popupWidth / 2}px)`;
  } else if (left + popupWidth > wrapperDim.width) {
    left = wrapperDim.width - popupWidth - 4;
    if (left < MIN_LEFT) left = MIN_LEFT;
  }

  let top =
    markerDim.y -
    wrapperDim.y +
    (markerDim.height || BLOCK_HEIGHT) +
    POPUP_DISTANCE_FROM_BLOCK +
    6;
  if (!isScrolling && top + popupHeight > wrapperDim.height) {
    const newTop =
      markerDim.y - wrapperDim.y - popupHeight - POPUP_DISTANCE_FROM_BLOCK;
    if (newTop > 0) {
      top = newTop;
    }
  }

  let display = 'block';
  if (top < 0 || top > wrapperDim.height) display = 'none';
  return {
    popupPosition: { top, left, display },
  };
};

class Popup extends Component {
  state = {
    popupPosition: { top: 0 },
  };

  componentDidMount() {
    const { marker, editorWrapper, wrapperRef } = this.props;
    if (marker) {
      this.setState({
        ...getPosition(marker, wrapperRef.current, editorWrapper.current),
      });
    }
    const scrollableSection = editorWrapper.current.children[1];
    scrollableSection.addEventListener('scroll', () => {
      this.setState({
        ...getPosition(marker, wrapperRef.current, editorWrapper.current, true),
        scrolling: true,
      });
    });
  }

  componentDidUpdate(prevProps) {
    const { changeCounter, marker, editorWrapper, wrapperRef } = this.props;
    const { popupPosition } = this.state;
    if (!marker) return;
    const oldPos = this.markerPos;
    const markerDim = marker.getBoundingClientRect();
    this.markerPos = {
      height: markerDim.height,
      left: markerDim.left,
      offsetTop: marker.offsetTop,
      width: markerDim.width,
    };
    if (
      isSamePos(oldPos, this.markerPos) &&
      popupPosition &&
      prevProps.changeCounter === changeCounter
    )
      return;
    // eslint-disable-next-line react/no-did-update-set-state
    this.setState({
      ...getPosition(marker, wrapperRef.current, editorWrapper.current),
      scrolling: false,
    });
  }

  render() {
    const { render, marker, wrapperRef, className } = this.props;
    if (!marker) return null;
    const { popupPosition, scrolling } = this.state;

    return (
      <Wrapper
        ref={wrapperRef}
        style={popupPosition}
        marker={marker}
        isScrolling={scrolling}
        className={className}
      >
        {render()}
      </Wrapper>
    );
  }
}

Popup.propTypes = {
  wrapperRef: PropTypes.shape({
    current: PropTypes.object,
  }).isRequired,
  editorWrapper: PropTypes.shape({
    current: PropTypes.object,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  marker: PropTypes.object.isRequired,
  render: PropTypes.func.isRequired,
  className: PropTypes.string,
  changeCounter: PropTypes.number,
};

Popup.defaultProps = {
  className: undefined,
};

export default Closeable(Popup);

const Wrapper = styled.div(
  { position: 'absolute', padding: '4px 4px 6px 4px;' },
  ({ theme: { constants, popup }, isScrolling }) => ({
    backgroundColor: constants.color.background.primary,
    color: constants.color.text.primary,

    border: constants.border.primary,
    borderRadius: constants.borderRadius.small,
    boxShadow: constants.boxShadow.primary,

    zIndex: isScrolling ? 0 : 1,

    ':focus': {
      outline: 'none',
    },

    ...popup.wrapper({ theme: constants }),
  })
);
