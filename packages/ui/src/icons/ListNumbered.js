import React from "react";

export default ({ fill, ...rest }) => (
  <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" {...rest}>
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g
        id="Desktop-HD"
        transform="translate(-942.000000, -378.000000)"
        fill={fill}
      >
        <rect id="Rectangle-Copy-2" x="948" y="382" width="12" height="1.5" />
        <rect id="Rectangle-Copy-6" x="948" y="387" width="12" height="1.5" />
        <rect id="Rectangle-Copy-5" x="948" y="392" width="12" height="1.5" />
        <text
          id="1"
          fontFamily="Arial-BoldMT, Arial"
          fontSize="5.5"
          fontWeight="bold"
        >
          <tspan x="943.5" y="384.5">
            1
          </tspan>
        </text>
        <text
          id="2"
          fontFamily="Arial-BoldMT, Arial"
          fontSize="5.5"
          fontWeight="bold"
        >
          <tspan x="943.5" y="389.5">
            2
          </tspan>
        </text>
        <text
          id="3"
          fontFamily="Arial-BoldMT, Arial"
          fontSize="5.5"
          fontWeight="bold"
        >
          <tspan x="943.5" y="394.5">
            3
          </tspan>
        </text>
      </g>
    </g>
  </svg>
);
