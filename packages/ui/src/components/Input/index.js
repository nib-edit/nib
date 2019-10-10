import PropTypes from "prop-types";
import React from "react";
import styled from "@emotion/styled";

const Input = props => {
  const { className, label } = props;
  return (
    <InputWrapper className={className}>
      {label && <span>{label}</span>}
      <StyledInput {...props} />
    </InputWrapper>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string
};

Input.defaultProps = {
  className: "",
  label: ""
};

const InputWrapper = styled.div(
  {
    alignItems: "center",
    display: "flex",
    lineHeight: 1
  },
  input => ({
    ...input.wrapper
  })
);

const StyledInput = styled.input(
  {
    height: 20,
    width: 180,
    margin: "0 12px 0 0",
    padding: 4,

    borderTop: "none",
    borderLeft: "none",
    borderRight: "none"
  },
  ({ theme: { constants, input } }) => ({
    borderBottom: `1px solid ${constants.color.border.secondary}`,

    backgroundColor: constants.color.background.primary,
    color: constants.color.text.primary,
    fontSize: constants.fontSize.medium,

    "&:focus": {
      borderTop: "none",
      borderLeft: "none",
      borderRight: "none",
      borderBottom: `1px solid ${constants.color.highlight.primary}`,
      outline: "none"
    },

    "&::placeholder": {
      fontSize: constants.color.text.secondary
    },

    ...input.input({ theme: constants })
  })
);

export default Input;
