import styled from "@emotion/styled";

export const StyledSVG = styled.svg`
  fill: ${({ theme }) => theme.icon.fill};
  :hover {
    ${({ theme }) => theme.icon["&:hover"]};
  }
`;
