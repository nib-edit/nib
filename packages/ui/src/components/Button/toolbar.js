import React from "react";
import styled from "@emotion/styled";

export default props => <StyledButton {...props} />;

const StyledButton = styled.button`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;

  background-color: ${({ theme }) => theme.button.toolbar.backgroundColor};
  color: ${({ theme }) => theme.button.toolbar.color};

  border: ${({ theme }) => theme.button.toolbar.border};
  border-radius: ${({ theme }) => theme.button.toolbar.borderRadius};
  height: ${({ theme }) => theme.button.toolbar.height};
  width: ${({ theme }) => theme.button.toolbar.width};
  margin: ${({ theme }) => theme.button.toolbar.margin};
  padding: ${({ theme }) => theme.button.toolbar.padding};

  font-size: ${({ theme }) => theme.button.toolbar.fontSize};

  :active {
    ${({ disabled, theme }) => !disabled && theme.button.toolbar["&:active"]};
  }
  :focus {
    ${({ disabled, theme }) => !disabled && theme.button.toolbar["&:hover"]};
  }
  :hover {
    ${({ disabled, theme }) => !disabled && theme.button.toolbar["&:hover"]};
  }
  ${({ selected, theme }) => selected && theme.button.toolbar["&:selected"]};
  ${({ disabled, theme }) => disabled && theme.button.toolbar["&:disabled"]};
`;
