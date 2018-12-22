import React, { Component } from "react";
import styled from "@emotion/styled";

export default class FloatWrapper extends Component {
  render() {
    const { selMarker, children } = this.props;
    if (!selMarker) return null;
    return (
      <FloatPanel
        className="editr-float-panel"
        style={{
          top: selMarker.offsetTop + selMarker.getBoundingClientRect().height,
          left: selMarker.offsetLeft
        }}
      >
        {children}
      </FloatPanel>
    );
  }
}

const FloatPanel = styled.div`
  position: absolute;
`;
