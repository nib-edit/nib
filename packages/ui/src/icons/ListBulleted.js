import React from "react";
import { withTheme } from "emotion-theming";

import { StyledSVG } from "./style";

export default withTheme(({ theme }) => (
  <StyledSVG width="20px" height="20px" viewBox="0 0 20 20" version="1.1">
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g
        id="Desktop-HD"
        transform="translate(-897.000000, -378.000000)"
        fill={theme.icon.fill}
      >
        <circle id="Oval" cx="900" cy="383" r="1" />
        <circle id="Oval" cx="900" cy="388" r="1" />
        <circle id="Oval-Copy" cx="900" cy="393" r="1" />
        <rect id="Rectangle" x="903" y="382" width="12" height="1.5" />
        <rect id="Rectangle-Copy-3" x="903" y="387" width="12" height="1.5" />
        <rect id="Rectangle-Copy-4" x="903" y="392" width="12" height="1.5" />
      </g>
    </g>
  </StyledSVG>
));
