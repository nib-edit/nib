import React from "react";
import { withTheme } from "emotion-theming";

import { StyledSVG } from "./style";

export default withTheme(({ theme }) => (
  <StyledSVG width="20px" height="20px" viewBox="0 0 20 20" version="1.1">
    <defs>
      <rect id="path-1" x="961" y="491" width="9" height="13" />
      <rect id="path-3" x="972" y="491" width="9" height="12" />
    </defs>
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="Desktop-HD" transform="translate(-961.000000, -487.000000)">
        <path
          d="M967,497 L975,497"
          id="Line-Copy-9"
          stroke={theme.icon.fill}
          strokeLinecap="square"
        />
        <mask id="mask-2" fill="white">
          <use xlinkHref="#path-1" />
        </mask>
        <g id="Rectangle" />
        <rect
          id="Rectangle-Copy-7"
          stroke={theme.icon.fill}
          strokeWidth="1.25"
          mask="url(#mask-2)"
          x="961.625"
          y="493.125"
          width="17.75"
          height="7.75"
          rx="3.875"
        />
        <mask id="mask-4" fill="white">
          <use xlinkHref="#path-3" />
        </mask>
        <g id="Rectangle" />
        <rect
          id="Rectangle"
          stroke={theme.icon.fill}
          strokeWidth="1.25"
          mask="url(#mask-4)"
          x="962.625"
          y="493.125"
          width="17.75"
          height="7.75"
          rx="3.875"
        />
      </g>
    </g>
  </StyledSVG>
));
