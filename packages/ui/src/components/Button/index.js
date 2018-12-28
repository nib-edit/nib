import React from "react";
import styled from "@emotion/styled";

export default props => <StyledButton {...props} />;

const StyledButton = styled.button`
  align-items: center;
  display: flex;
  justify-content: center;

  border-radius: ${({ theme }) => theme.button.borderRadius};
  border: ${({ theme }) => theme.button.border};
  height: ${({ theme }) => theme.button.height};
  margin-bottom: ${({ theme }) => theme.button.marginLeft};
  margin-left: ${({ theme }) => theme.button.marginLeft};
  margin-right: ${({ theme }) => theme.button.marginLeft};
  margin-top: ${({ theme }) => theme.button.marginLeft};
  padding: ${({ theme }) => theme.button.padding};
  width: ${({ theme }) => theme.button.width};

  background-color: ${({ theme }) => theme.button.backgroundColor};
  color: ${({ theme }) => theme.button.color};
  cursor: pointer;

  :hover {
    ${({ theme }) => theme.button["&:hover"]};
  }
  ${({ selected, theme }) => selected && theme.button["&:selected"]};
`;
