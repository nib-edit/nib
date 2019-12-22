import React from 'react';

export default ({ fill, ...rest }) => (
  <svg width="17px" height="17px" viewBox="0 0 17 17" {...rest}>
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="Desktop-HD" transform="translate(-1065.000000, -645.000000)">
        <g id="Group-2" transform="translate(1065.500000, 645.500000)">
          <circle id="Oval" stroke={fill} fill={fill} cx="8" cy="8" r="8" />
          <path
            d="M2.02049061,7.83867243 L13.6568542,7.83867243"
            id="Line-9"
            stroke="#FFFFFF"
            strokeLinecap="square"
            transform="translate(7.838672, 7.838672) rotate(45.000000) translate(-7.838672, -7.838672) "
          />
          <path
            d="M2.02049061,7.83867243 L13.6568542,7.83867243"
            id="Line-9"
            stroke="#FFFFFF"
            strokeLinecap="square"
            transform="translate(7.838672, 7.838672) rotate(-45.000000) translate(-7.838672, -7.838672) "
          />
        </g>
      </g>
    </g>
  </svg>
);
