import React from "react";
import {withTheme} from "emotion-theming";

import {StyledSVG} from "./style";

export default withTheme(({theme}) => (
  <StyledSVG width="11px" height="14px" viewBox="0 0 11 14">
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
      <text id="P" fill={theme.icon.fill}>
        <tspan x="-0.502929688" y="12">
          P
        </tspan>
      </text>
    </g>
  </StyledSVG>
));
