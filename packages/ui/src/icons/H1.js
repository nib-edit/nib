import React from "react";
import { withTheme } from "emotion-theming";

import { StyledSVG } from "./style";

export default withTheme(({ theme }) => (
  <StyledSVG width="20px" height="15px" viewBox="0 0 20 15">
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
      <text id="H1" fill={theme.icon.fill}>
        <tspan x="-0.504882812" y="13">
          H1
        </tspan>
      </text>
    </g>
  </StyledSVG>
));
