import React, { Component } from "react";
import styled from "@emotion/styled";

export default class Modal extends Component {
  render() {
    const { marker, children } = this.props;
    if (!marker) return null;
    return (
      <FloatPanel
        className="nib-float-panel"
        style={{
          top: marker.offsetTop + marker.getBoundingClientRect().height + 6,
          left: marker.offsetLeft
        }}
      >
        {children}
      </FloatPanel>
    );
  }
}

const FloatPanel = styled.div`
  position: absolute;
  font-weight: 600;
`;
