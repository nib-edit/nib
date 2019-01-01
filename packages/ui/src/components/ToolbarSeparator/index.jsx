import React from "react";
import styled from "@emotion/styled";

export default props => <ToolbarSeparator {...props} />;

export const ToolbarSeparator = styled.div`
  background-color: ${({ theme }) => theme.toolbarSeparator.backgroundColor};
  display: inline-block;
  height: ${({ theme }) => theme.toolbarSeparator.height};
  margin: ${({ theme }) => theme.toolbarSeparator.margin};
  width: 1px;
`;
