import React from 'react';

export default ({ fill, ...rest }) => (
  <svg width="20px" height="21px" viewBox="0 0 20 21" {...rest}>
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="Desktop-HD" transform="translate(-324.000000, -633.000000)">
        <g id="Group-5" transform="translate(324.000000, 633.000000)">
          <rect
            id="Rectangle"
            stroke={fill}
            fill="#FFFFFF"
            x="0.5"
            y="0.5"
            width="19"
            height="14"
            rx="2"
          />
          <path
            d="M19.5,11 L19.5,20"
            id="Line-10"
            stroke={fill}
            strokeLinecap="round"
          />
          <path
            d="M17.2175144,14.5961941 L16.863961,20.6066017"
            id="Line-10"
            stroke={fill}
            strokeLinecap="square"
            transform="translate(16.596194, 17.474874) rotate(-45.000000) translate(-16.596194, -17.474874) "
          />
          <polygon
            id="Triangle"
            fill="#FFFFFF"
            transform="translate(16.500000, 13.500000) scale(-1, 1) rotate(90.000000) translate(-16.500000, -13.500000) "
            points="16.5 11 22 16 11 16"
          />
          <g
            id="Group-6"
            transform="translate(5.500000, 3.500000)"
            stroke={fill}
            strokeLinecap="square"
          >
            <path d="M4.26325641e-14,1 L9.25,1" id="Line-12" />
            <path d="M1.43392243e-14,4 L9.25,4" id="Line-12" />
            <path d="M4.26325641e-14,7 L9.25,7" id="Line-12" />
          </g>
        </g>
      </g>
    </g>
  </svg>
);
