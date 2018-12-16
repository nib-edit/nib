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

  margin-left: ${({ theme }) => theme.menuButton.marginLeft};
  border: ${({ theme }) => theme.menuButton.border};
  border-radius: ${({ theme }) => theme.menuButton.borderRadius};
  background-color: ${({ theme }) => theme.menuButton.backgroundColor};
  color: ${({ theme }) => theme.menuButton.color};
  height: ${({ theme }) => theme.menuButton.height};
  width: ${({ theme }) => theme.menuButton.width};
  :hover {
    ${({ theme }) => theme.menuButton["&:hover"]};
  }
  ${({ selected, theme }) => selected && theme.menuButton["&:selected"]};
`;
