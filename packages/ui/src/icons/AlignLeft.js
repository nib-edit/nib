import React from 'react';

export default ({ fill, ...rest }) => (
  <svg width="20" height="20" {...rest}>
    <g fill={fill} fillRule="evenodd">
      <path d="M2 3h16v1H2zM2 7h8v5H2zM2 15h16v1H2z" />
    </g>
  </svg>
);
