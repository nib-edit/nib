import React from "react";
import styled from "@emotion/styled";

export default props => <StyledButton {...props} />;

const StyledButton = styled.button`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;

  background-color: ${({theme}) => theme.button.link.backgroundColor};
  color: ${({theme}) => theme.button.link.color};

  border: ${({theme}) => theme.button.link.border};
  border-radius: ${({theme}) => theme.button.link.borderRadius};
  height: ${({theme}) => theme.button.link.height};
  width: ${({theme}) => theme.button.link.width};
  margin: ${({theme}) => theme.button.link.margin};
  padding: ${({theme}) => theme.button.link.padding};

  font-size: ${({theme}) => theme.button.link.fontSize};
  text-decoration: ${({theme}) => theme.button.link.textDecoration};

  :active {
    ${({disabled, theme}) => !disabled && theme.button.link["&:active"]};
  }
  :hover {
    ${({disabled, theme}) => !disabled && theme.button.link["&:hover"]};
  }
  :focus {
    ${({disabled, theme}) => !disabled && theme.button.link["&:focus"]};
  }
  ${({disabled, theme}) => disabled && theme.button.link["&:disabled"]};
`;
