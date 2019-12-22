import React from 'react';

export default ({ fill, selectedColor, ...rest }) => (
  <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" {...rest}>
    <defs>
      <rect
        id="path-bg-color"
        x="1038.54835"
        y="699.95533"
        width="3"
        height="3"
      />
    </defs>
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="Desktop-HD" transform="translate(-1025.000000, -698.000000)">
        <path
          d="M1028,716.5 L1041.40596,716.5"
          id="Line-6"
          stroke={selectedColor || fill}
          strokeWidth="1.5"
          fill={selectedColor || fill}
          strokeLinecap="round"
        />
        <path
          d="M1029.2426,709.764841 L1036.87192,701.582009"
          id="Line-7"
          stroke={fill}
          strokeLinecap="square"
          transform="translate(1033.057261, 705.673425) rotate(2.000000) translate(-1033.057261, -705.673425) "
        />
        <path
          d="M1031.9946,712.726263 L1039.62461,704.544079"
          id="Line-7"
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="translate(1035.809610, 708.635171) rotate(2.000000) translate(-1035.809610, -708.635171) "
        />
        <path
          d="M1036.04427,699.692175 L1041.80902,705.658199"
          id="Line-8"
          stroke={fill}
          strokeWidth="1.5"
          strokeLinecap="square"
          transform="translate(1038.926647, 702.675187) rotate(-1.000000) translate(-1038.926647, -702.675187) "
        />
        <path d="" id="Path-9" stroke="#979797" />
        <polyline
          id="path-bg-color1"
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="translate(1030.115084, 711.212987) rotate(-4.000000) translate(-1030.115084, -711.212987) "
          points="1028.98706 709.712987 1028.61508 712.712987 1031.61508 712.712987"
        />
        <g
          id="Rectangle"
          transform="translate(1040.048350, 701.455330) rotate(135.500000) translate(-1040.048350, -701.455330) "
          stroke={fill}
        >
          <rect
            strokeLinejoin="square"
            fill={fill}
            fillRule="evenodd"
            x="1039.04835"
            y="700.45533"
            width="2"
            height="2"
          />
        </g>
      </g>
    </g>
  </svg>
);
