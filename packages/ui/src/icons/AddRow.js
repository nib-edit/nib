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
      fill={fill}
      fillRule="evenodd"
      strokeLinecap="square"
    >
      <g
        id="Desktop-HD"
        transform="translate(-1035.000000, -436.000000)"
        stroke="#212121"
      >
        <path d="M1038.5,439 L1038.5,453" id="Line-2-Copy-2" />
        <path d="M1052.5,439 L1052.5,453" id="Line-2-Copy-7" />
        <path d="M1045.5,439 L1045.5,443.5" id="Line-2-Copy-8" />
        <path d="M1045.5,447 L1045.5,450" id="Line-2-Copy-8" />
        <path d="M1039,439 L1052,439" id="Line" />
        <path d="M1039,444 L1052,444" id="Line-Copy-7" />
        <path d="M1044,448.5 L1047,448.5" id="Line-Copy-7" />
        <path d="M1039,453 L1052,453" id="Line-Copy-6" />
      </g>
    </g>
  </svg>
);
