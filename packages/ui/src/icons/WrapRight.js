import React from 'react';

export default ({ fill, ...rest }) => (
  <svg width="20" height="20" {...rest}>
    <g fill={fill} fillRule="evenodd">
      <path d="M2 3h16v1H2zM2 6h7v1H2zM2 9h7v1H2zM2 15h16v1H2zM2 12h7v1H2zM11 7h7v5h-7z" />
    </g>
  </svg>
);
