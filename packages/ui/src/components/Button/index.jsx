import React, { Component } from "react";
import styled from "@emotion/styled";

export default class Button extends Component {
  render() {
    return <StyledButton {...this.props} />;
  }
}

export const StyledButton = styled.button`
  align-items: center;
  display: flex;
  justify-content: center;
  cursor: pointer;
  padding: 0;
`;
