import PropTypes from "prop-types";
import React from "react";
import styled from "@emotion/styled";
import { components } from "react-select";

const wrapperStyle = {
  alignItems: "center",
  display: "flex",
  justifyContent: "space-between",
  width: "100%"
};

const Option = props => {
  const { label, value } = props;
  return (
    <components.Option {...props}>
      <props.value.tag style={wrapperStyle}>
        {label}
        <Keymap>{value.keymap}</Keymap>
      </props.value.tag>
    </components.Option>
  );
};

Option.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.shape({
    blockType: PropTypes.string,
    tag: PropTypes.string,
    keymap: PropTypes.string
  }).isRequired
};

const Keymap = styled.span`
  color: ${({ theme }) => theme.constants.color.text.secondary};
  font-size: ${({ theme }) => theme.constants.fontSize.small};
`;

export default Option;
