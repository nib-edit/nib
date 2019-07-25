import React from "react";
import { withTheme } from "emotion-theming";

import { StyledSVG } from "./style";

export default withTheme(({ theme }) => (
  <StyledSVG width="20px" height="20px" viewBox="0 0 20 20" version="1.1">
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g
        id="Desktop-HD"
        transform="translate(-717.000000, -401.000000)"
        fill={theme.icon.fill}
      >
        <g id="Group" transform="translate(720.750000, 404.000000)">
          <rect
            id="Rectangle"
            transform="translate(6.000000, 7.000000) rotate(12.000000) translate(-6.000000, -7.000000) "
            x="5.25"
            y="1"
            width="1.5"
            height="12"
          />
          <rect id="Rectangle" x="2.4" y="1" width="9" height="1.5" />
          <rect id="Rectangle-Copy" x="0.25" y="12" width="9" height="1.5" />
        </g>
      </g>
    </g>
  </StyledSVG>
));
