import React from "react";
import { withTheme } from "emotion-theming";

import { StyledSVG } from "./style";

export default withTheme(({ theme }) => (
  <StyledSVG width="16px" height="16px" viewBox="0 0 16 16" version="1.1">
    <g
      id="Page-1"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
    >
      <g
        id="Desktop-HD"
        transform="translate(-928.000000, -633.000000)"
        stroke={theme.icon.fill}
      >
        <polyline
          id="Path-7"
          points="929.946458 638.5 936 643.088594 941.906213 638.5"
        />
      </g>
    </g>
  </StyledSVG>
));
