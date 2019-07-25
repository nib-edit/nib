import React from "react";
import { withTheme } from "emotion-theming";

import { StyledSVG } from "./style";

export default withTheme(({ theme }) => (
  <StyledSVG width="20px" height="20px" viewBox="0 0 20 20" version="1.1">
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g
        id="Desktop-HD"
        transform="translate(-995.000000, -479.000000)"
        stroke={theme.icon.fill}
      >
        <path
          d="M1005,482 L1005,496"
          id="Line-2-Copy-9"
          strokeLinecap="square"
        />
        <path
          d="M997.5,489 L1012,489"
          id="Line-Copy-8"
          strokeLinecap="square"
        />
        <rect id="Rectangle" x="997.5" y="481.5" width="15" height="15" />
      </g>
    </g>
  </StyledSVG>
));
