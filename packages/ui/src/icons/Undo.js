import React from "react";
import { withTheme } from "emotion-theming";

import { StyledSVG } from "./style";

export default withTheme(({ theme }) => (
  <StyledSVG width="20px" height="20px" viewBox="0 0 20 20" version="1.1">
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g
        id="Desktop-HD"
        transform="translate(-961.000000, -548.000000)"
        stroke={theme.icon.fill}
      >
        <polygon
          id="Path-6"
          fill={theme.icon.fill}
          points="961.5 562.495555 961.5 556.5 967.5 562.495555"
        />
        <path
          d="M964.5,559.497777 C967.10552,556.165554 969.772187,554.499628 972.5,554.5 C975.227813,554.500372 977.99558,556.167039 980.803301,559.5"
          id="Path-5"
        />
      </g>
    </g>
  </StyledSVG>
));
