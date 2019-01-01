import React from "react";
import styled from "@emotion/styled";

export default props => <StyledButton {...props} />;

const StyledButton = styled.button`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;

  background-color: ${({ theme }) => theme.button.backgroundColor};
  color: ${({ theme }) => theme.button.color};

  border: ${({ theme }) => theme.button.border};
  border-radius: ${({ theme }) => theme.button.borderRadius};
  height: ${({ theme }) => theme.button.height};
  width: ${({ theme }) => theme.button.width};
  margin: ${({ theme }) => theme.button.margin};
  padding: ${({ theme }) => theme.button.padding};

  font-size: ${({ theme }) => theme.button.fontSize};

  :hover {
    ${({ theme }) => theme.button["&:hover"]};
  }
  ${({ selected, theme }) => selected && theme.button["&:selected"]};
`;
