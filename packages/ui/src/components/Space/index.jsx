import PropTypes from "prop-types";
import React from "react";
import styled from "@emotion/styled";

const Space = props => <StyledSpace {...props} />;

export const SpaceSize = {
  s: 2,
  m: 4,
  l: 8,
  xl: 16
};

export const StyledSpace = styled.span(
  { display: "inline-block" },
  ({ size }) => ({
    width: `${size}px`
  })
);

Space.propTypes = {
  size: PropTypes.number
};

Space.defaultProps = {
  size: SpaceSize.s
};

export default Space;
