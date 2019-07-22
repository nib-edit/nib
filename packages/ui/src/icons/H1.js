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
        transform="translate(-814.000000, -443.000000)"
        fill={theme.icon.fill}
        fillRule="nonzero"
        stroke="#FFFFFF"
        strokeWidth="8"
      >
        <path
          d="M815.361328,459.5 L815.361328,447.331055 L816.97168,447.331055 L816.97168,452.328125 L823.296875,452.328125 L823.296875,447.331055 L824.907227,447.331055 L824.907227,459.5 L823.296875,459.5 L823.296875,453.76416 L816.97168,453.76416 L816.97168,459.5 L815.361328,459.5 Z M832.610352,459.5 L831.116211,459.5 L831.116211,449.979004 C830.756509,450.322105 830.284752,450.6652 829.700928,451.008301 C829.117103,451.351401 828.592776,451.608723 828.12793,451.780273 L828.12793,450.335938 C828.963546,449.943032 829.694007,449.467125 830.319336,448.908203 C830.944665,448.349281 831.387368,447.806969 831.647461,447.28125 L832.610352,447.28125 L832.610352,459.5 Z"
          id="H1"
        />
      </g>
    </g>
  </StyledSVG>
));
