import React from "react";
import { withTheme } from "emotion-theming";

import { StyledSVG } from "./style";

export default withTheme(({ theme }) => (
  <StyledSVG width="22px" height="15px" viewBox="0 0 22 15">
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
      <text id="H5" fill={theme.icon.fill}>
        <tspan x="-1.00488281" y="13">
          H5
        </tspan>
      </text>
    </g>
  </StyledSVG>
));
