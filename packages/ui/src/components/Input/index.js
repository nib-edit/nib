import React from "react";
import styled from "@emotion/styled";

export default props => {
  const { label, name } = props;
  return (
    <InputWrapper>
      {label && <label htmlFor={name}>{label}</label>}
      <StyledInput {...props} />
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  align-items: center;
  display: flex;
`;

const StyledInput = styled.input`
  background-color: ${({ theme }) => theme.input.backgroundColor};
  border: ${({ theme }) => theme.input.border};
  color: ${({ theme }) => theme.input.color};
  font-size: ${({ theme }) => theme.input.fontSize};
  height: ${({ theme }) => theme.input.height};
  margin: ${({ theme }) => theme.input.margin};
  padding: ${({ theme }) => theme.input.padding};
  width: ${({ theme }) => theme.input.width};
  &:focus {
    ${({ theme }) => theme.input["&:focus"]};
  }
`;
