import React from "react";
import { withTheme } from "emotion-theming";

import { StyledSVG } from "./style";

export default withTheme(({ theme }) => (
  <StyledSVG width="23px" height="15px" viewBox="0 0 23 15">
    <g
      id="Page-1"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
      fontFamily="ArialMT, Arial"
      fontSize="15"
      fontWeight="600"
    >
      <text id="H3" fill={theme.icon.fill}>
        <tspan x="-0.0048828125" y="13">
          H3
        </tspan>
      </text>
    </g>
  </StyledSVG>
));
