import PropTypes from "prop-types";
import React from "react";
import styled from "@emotion/styled";

const Input = props => {
  const { className, label, name } = props;
  return (
    <InputWrapper className={className}>
      {label && <label htmlFor={name}>{label}</label>}
      <StyledInput {...props} />
    </InputWrapper>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string
};

export default Input;

const InputWrapper = styled.div`
  align-items: center;
  display: flex;
  line-height: 1;
`;

const StyledInput = styled.input`
  background-color: ${({ theme }) => theme.input.backgroundColor};
  color: ${({ theme }) => theme.input.color};
  border: ${({ theme }) => theme.input.border};
  height: ${({ theme }) => theme.input.height};
  width: ${({ theme }) => theme.input.width};
  margin: ${({ theme }) => theme.input.margin};
  padding: ${({ theme }) => theme.input.padding};
  font-size: ${({ theme }) => theme.input.fontSize};
  &:focus {
    ${({ theme }) => theme.input["&:focus"]};
  }
`;
