import React from "react";
import styled from "@emotion/styled";

export default props => <Separator {...props} />;

export const Separator = styled.div`
  background-color: ${({ theme }) => theme.separator.backgroundColor};
  display: inline-block;
  height: ${({ theme }) => theme.separator.height};
  margin: ${({ theme }) => theme.separator.margin};
  width: 1px;
`;
