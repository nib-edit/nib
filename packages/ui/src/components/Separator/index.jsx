import React from "react";
import styled from "@emotion/styled";

export default props => <Separator {...props} />;

export const Separator = styled.span`
  display: inline-block;
  width: ${({ type }) => (type === "toolbar" ? 2 : 4)}px;
`;
