import React from "react";

export default ({ fill, ...rest }) => (
  <svg
    width="20px"
    height="20px"
    viewBox="0 0 20 20"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <defs />
    <g
      id="Page-1"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
      strokeLinecap="square"
    >
      <g
        id="Desktop-HD"
        transform="translate(-1035.000000, -460.000000)"
        stroke={fill}
      >
        <path d="M1038.5,463 L1038.5,477" id="Line-2-Copy-2" />
        <path d="M1052.5,463 L1052.5,477" id="Line-2-Copy-7" />
        <path d="M1045.5,463 L1045.5,467.5" id="Line-2-Copy-8" />
        <path d="M1039,463 L1052,463" id="Line" />
        <path d="M1039,468 L1052,468" id="Line-Copy-7" />
        <path d="M1043.5,472.5 L1047.5,472.5" id="Line-Copy-7" />
        <path d="M1039,477 L1052,477" id="Line-Copy-6" />
      </g>
    </g>
  </svg>
);
