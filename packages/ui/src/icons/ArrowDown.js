import React from "react";
import { StyledSVG } from "./style";

export default ({ onClick }) => (
  <StyledSVG width="24" height="24" viewBox="0 0 24 24" onClick={onClick}>
    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
    <path fill="none" d="M0 0h24v24H0V0z" />
  </StyledSVG>
);
