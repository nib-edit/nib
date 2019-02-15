import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/core";

export default ({ className }) => <StyledSpinner className={className} />;

const Spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const StyledSpinner = styled.div`
  animation: ${Spin} 1s linear infinite;
  border: 5px solid #ffffff;
  border-top: 5px solid #0000e4;
  border-radius: 50%;
  height: 24px;
  width: 24px;
`;

// todo: all UI components should take className props
