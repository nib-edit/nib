import React from "react";
import styled from "@emotion/styled";

const Separator = props => <StyledSeparator {...props} />;

const StyledSeparator = styled.div(
  { display: "inline-block", height: 24, margin: "0px 4px", width: 1 },
  ({ theme: { constants, separator } }) => ({
    backgroundColor: constants.color.lightBorder,
    ...separator({ theme: constants })
  })
);

export default Separator;
