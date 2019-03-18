import React from "react";
import styled from "@emotion/styled";
import { components } from "react-select";

export default props => {
  return (
    <components.Option {...props}>
      <props.value.tag style={wrapperStyle}>
        {props.label}
        <Keymap>{props.value.keymap}</Keymap>
      </props.value.tag>
    </components.Option>
  );
};

const wrapperStyle = {
  alignItems: "center",
  display: "flex",
  justifyContent: "space-between",
  width: "100%"
};

const Keymap = styled.span`
  color: ${({ theme }) => theme.blockSelect.keymapColor};
  font-size: 10px;
`;
