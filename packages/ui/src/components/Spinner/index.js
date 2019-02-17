import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/core";

export default props => <StyledSpinner {...props} />;

const Spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const StyledSpinner = styled.div`
  animation: ${Spin} 1s linear infinite;
  border-color: ${({ theme }) => theme.spinner.borderColor};
  border-radius: 50%;
  border-style: solid;
  border-top-color: ${({ theme }) => theme.spinner.borderTopColor};
  border-width: ${({ theme }) => theme.spinner.borderWidth};
  height: ${({ theme }) => theme.spinner.height};
  width: ${({ theme }) => theme.spinner.width};
`;
