import React from "react";

export default ({ fill, selectedColor, ...rest }) => (
  <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" {...rest}>
    <defs>
      <rect
        id="path-bg-color"
        x="999.787544"
        y="700.118413"
        width="3"
        height="3"
      />
    </defs>
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="Desktop-HD" transform="translate(-987.000000, -698.000000)">
        <path
          d="M990,716.5 L1003.40596,716.5"
          id="Line-6"
          stroke={selectedColor || fill}
          strokeWidth="1.5"
          fill={selectedColor || fill}
          strokeLinecap="round"
        />
        <path
          d="M990.424621,710 L998.25,702"
          id="Line-7"
          stroke={fill}
          strokeLinecap="square"
        />
        <path
          d="M993.424621,713 L1001.25,705"
          id="Line-7"
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M997.147734,700.07649 L1003.08333,705.877535"
          id="Line-8"
          stroke={fill}
          strokeWidth="1.5"
          strokeLinecap="square"
          transform="translate(1000.115530, 702.977012) rotate(-3.000000) translate(-1000.115530, -702.977012) "
        />
        <path d="" id="Path-9" stroke="#979797" />
        <polyline
          id="Path-11"
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          points="990.424621 710 990 713 993.424621 713"
        />
        <g
          id="Rectangle"
          transform="translate(1001.287544, 701.618413) rotate(132.000000) translate(-1001.287544, -701.618413) "
          stroke={fill}
        >
          <rect
            strokeLinejoin="square"
            fill={fill}
            fillRule="evenodd"
            x="1000.28754"
            y="700.618413"
            width="2"
            height="2"
          />
          <use xlinkHref="#path-bg-color" />
        </g>
      </g>
    </g>
  </svg>
);
