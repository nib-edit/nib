import React from "react";
import { withTheme } from "emotion-theming";
import styled from "@emotion/styled";

import Icons from "../../icons";

export default withTheme(({ theme, selected, name, ...rest }) => {
  const { text, highlight } = theme.constants.color;
  let fill = text;
  if (selected) fill = highlight;

  const IconComponent = Icons[name];
  return (
    <Wrapper>
      <IconComponent fill={fill} {...rest} />
    </Wrapper>
  );
});

const Wrapper = styled.span(
  { display: "flex" },
  ({ theme: { constants, icon } }) => ({
    ...icon({ theme: constants })
  })
);
