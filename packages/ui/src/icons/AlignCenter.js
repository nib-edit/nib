import React from 'react';

export default ({ fill, ...rest }) => (
  <svg width="20" height="20" {...rest}>
    <g fill={fill} fillRule="evenodd">
      <path d="M2 3h16v1H2zM5 6h10v1H5zM2 9h16v1H2zM2 15h16v1H2zM5 12h10v1H5z" />
    </g>
  </svg>
);
