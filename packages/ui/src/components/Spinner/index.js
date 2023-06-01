import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const Spinner = (props) => <StyledSpinner {...props} />;

const Spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const StyledSpinner = styled.div(
  {
    animation: `${Spin} 1s linear infinite`,

    borderRadius: "50%",
    borderStyle: "solid",
    borderWidth: 4,

    height: 24,
    width: 24,
  },
  ({ theme: { constants, spinner = {} } }) => ({
    borderColor: constants.color.border.primary,
    borderTopColor: constants.color.highlight.primary,

    ...spinner({ theme: constants }),
  })
);

export default Spinner;
