import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const Space = props => <StyledSpace {...props} />;

const SpaceDimensions = {
  small: 2,
  medium: 4,
  large: 8,
  extraLarge: 16
};

export const StyledSpace = styled.span(
  { display: "inline-block" },
  ({ size }) => ({
    width: `${SpaceDimensions[size]}px`
  })
);

Space.propTypes = {
  type: PropTypes.string
};

Space.defaultProps = {
  type: "small"
};

export default Space;
