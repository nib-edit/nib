import React from "react";
import styled from "@emotion/styled";

export default props => <StyledButton {...props} />;

const StyledButton = styled.button`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;

  background-color: ${({ theme }) => theme.button.primary.backgroundColor};
  color: ${({ theme }) => theme.button.primary.color};

  border: ${({ theme }) => theme.button.primary.border};
  border-radius: ${({ theme }) => theme.button.primary.borderRadius};
  height: ${({ theme }) => theme.button.primary.height};
  width: ${({ theme }) => theme.button.primary.width};
  margin: ${({ theme }) => theme.button.primary.margin};
  padding: ${({ theme }) => theme.button.primary.padding};

  font-size: ${({ theme }) => theme.button.primary.fontSize};

  :hover {
    ${({ disabled, theme }) =>
      !disabled ? theme.button.primary["&:hover"] : ""};
  }
  ${({ selected, theme }) => selected && theme.button.primary["&:selected"]};
  ${({ disabled, theme }) => disabled && theme.button.primary["&:disabled"]};
`;
