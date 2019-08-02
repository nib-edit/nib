import React from "react";
import styled from "@emotion/styled";

export default props => <StyledButton {...props} />;

const StyledButton = styled.button(
  {
    alignItems: "center",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",

    border: "none",
    margin: "4px 0",
    padding: "0 6px",

    textDecoration: "underline",
    transition: "all 0.2s ease"
  },
  ({ theme: { constants, button }, disabled }) => ({
    backgroundColor: constants.color.background,
    color: constants.color.text,
    fontSize: constants.fontSize.medium,

    ":hover": {
      color: constants.color.highlight
    },
    ":focus": {
      color: constants.color.highlight,
      outline: "none"
    },

    ...(disabled ? constants.disabled : {}),
    ...button.primary({ theme: constants })
  })
);
