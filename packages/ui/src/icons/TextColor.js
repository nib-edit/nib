import React from "react";

export default ({ fill, selectedColor, ...rest }) => (
  <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" {...rest}>
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g
        id="Desktop-HD"
        transform="translate(-1024.000000, -654.000000)"
        fill={fill}
        stroke={fill}
        strokeWidth="1.5"
      >
        <path d="M1030,665.46984 L1037,665.424621" id="Path-10" />
        <path
          d="M1033.5,657.687825 L1028,669"
          id="Line-5"
          strokeLinecap="round"
        />
        <path
          d="M1033.5,657.687825 L1039,669"
          id="Line-5"
          strokeLinecap="round"
        />
        <path
          d="M1028,671.849242 L1039,671.849242"
          id="Line-6"
          stroke={selectedColor || fill}
          strokeLinecap="round"
        />
      </g>
    </g>
  </svg>
);
