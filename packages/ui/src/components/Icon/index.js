import React from "react";
import { withTheme } from "emotion-theming";
import styled from "@emotion/styled";

import Icons from "../../icons";

export default withTheme(({ theme, selected, name, ...rest }) => {
  let { fill } = theme.icon;
  if (selected) fill = theme.icon.selectedFill;

  const IconComponent = Icons[name];
  return (
    <Wrapper>
      <IconComponent fill={fill} {...rest} />
    </Wrapper>
  );
});

const Wrapper = styled.span`
  display: flex;
  transition: all 0.1s ease;
  :hover {
    transform: scale(1.15);
  }
  :active {
    transform: scale(0.95);
  }
`;
