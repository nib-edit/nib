import React from 'react';

export default ({ fill, ...rest }) => (
  <svg width="20" height="20" {...rest}>
    <g fill={fill} fillRule="evenodd">
      <path d="M2 3h16v1H2zM11 6h7v1h-7zM11 9h7v1h-7zM2 15h16v1H2zM11 12h7v1h-7zM2 7h7v5H2z" />
    </g>
  </svg>
);
