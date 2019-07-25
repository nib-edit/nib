import React from "react";
import { withTheme } from "emotion-theming";

import { StyledSVG } from "./style";

export default withTheme(({ theme }) => (
  <StyledSVG width="20px" height="20px" viewBox="0 0 20 20" version="1.1">
    <g
      id="Page-1"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
      strokeOpacity="0"
    >
      <g
        id="Desktop-HD"
        transform="translate(-827.000000, -548.000000)"
        fill={theme.icon.fill}
        fillRule="nonzero"
        stroke="#FFFFFF"
        strokeWidth="8"
      >
        <path
          d="M827.361328,564.5 L827.361328,552.331055 L828.97168,552.331055 L828.97168,557.328125 L835.296875,557.328125 L835.296875,552.331055 L836.907227,552.331055 L836.907227,564.5 L835.296875,564.5 L835.296875,558.76416 L828.97168,558.76416 L828.97168,564.5 L827.361328,564.5 Z M843.771973,564.5 L843.771973,561.586426 L838.492676,561.586426 L838.492676,560.216797 L844.045898,552.331055 L845.266113,552.331055 L845.266113,560.216797 L846.909668,560.216797 L846.909668,561.586426 L845.266113,561.586426 L845.266113,564.5 L843.771973,564.5 Z M843.771973,560.216797 L843.771973,554.72998 L839.961914,560.216797 L843.771973,560.216797 Z"
          id="H4"
        />
      </g>
    </g>
  </StyledSVG>
));
