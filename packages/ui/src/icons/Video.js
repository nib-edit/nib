import React from "react";
import { withTheme } from "emotion-theming";

import { StyledSVG } from "./style";

export default withTheme(({ theme }) => (
  <StyledSVG width="20px" height="20px" viewBox="0 0 20 20" version="1.1">
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g
        id="Desktop-HD"
        transform="translate(-980.000000, -408.000000)"
        stroke={theme.icon.fill}
      >
        <polygon
          id="Path-3"
          fill={theme.icon.fill}
          points="995 416.341419 999.5 412.785827 999.5 422.785827 995 419.335816"
        />
        <rect
          id="Rectangle"
          x="980.5"
          y="412"
          width="13.5"
          height="11"
          rx="1"
        />
      </g>
    </g>
  </StyledSVG>
));
