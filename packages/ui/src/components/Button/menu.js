import React from "react";
import styled from "@emotion/styled";

export default props => <StyledButton {...props} />;

const StyledButton = styled.button`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;

  background-color: ${({ theme }) => theme.button.menu.backgroundColor};
  color: ${({ theme }) => theme.button.menu.color};

  border: ${({ theme }) => theme.button.menu.border};
  border-radius: ${({ theme }) => theme.button.menu.borderRadius};
  height: ${({ theme }) => theme.button.menu.height};
  width: ${({ theme }) => theme.button.menu.width};
  margin: ${({ theme }) => theme.button.menu.margin};
  padding: ${({ theme }) => theme.button.menu.padding};

  font-size: ${({ theme }) => theme.button.menu.fontSize};

  :hover {
    ${({ disabled, theme }) => (!disabled ? theme.button.menu["&:hover"] : "")};
  }
  ${({ selected, theme }) => selected && theme.button.menu["&:selected"]};
  ${({ disabled, theme }) => disabled && theme.button.menu["&:disabled"]};
`;
