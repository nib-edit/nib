import React from "react";
import styled from "@emotion/styled";

export default props => <StyledButton {...props} />;

const StyledButton = styled.button`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;

  background-color: ${({ theme }) => theme.button.basic.backgroundColor};
  color: ${({ theme }) => theme.button.basic.color};

  border: ${({ theme }) => theme.button.basic.border};
  border-radius: ${({ theme }) => theme.button.basic.borderRadius};
  height: ${({ theme }) => theme.button.basic.height};
  width: ${({ theme }) => theme.button.basic.width};
  margin: ${({ theme }) => theme.button.basic.margin};
  padding: ${({ theme }) => theme.button.basic.padding};

  font-size: ${({ theme }) => theme.button.basic.fontSize};

  :hover {
    ${({ disabled, theme }) =>
      !disabled ? theme.button.basic["&:hover"] : ""};
  }
  :focus {
    ${({ disabled, theme }) =>
      !disabled ? theme.button.basic["&:focus"] : ""};
  }
  ${({ disabled, theme }) => disabled && theme.button.basic["&:disabled"]};
`;
