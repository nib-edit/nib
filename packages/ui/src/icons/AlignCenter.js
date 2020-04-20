import React from 'react';

export default ({ fill, ...rest }) => (
  <svg width="20" height="20" {...rest}>
    <g fill={fill} fillRule="evenodd">
      <path d="M2 3h16v1H2zM18 15v1H2v-1h16zm-4-8v5H6V7h8z" />
    </g>
  </svg>
);
