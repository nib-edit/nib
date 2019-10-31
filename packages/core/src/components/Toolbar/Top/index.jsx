import React, { Fragment } from "react";
import styled from "@emotion/styled";

import { Separator } from "nib-ui";

import getToolbarComponents from "../../../utils/editor/toolbar";
import { useConfigContext } from "../../../context/config";

const Top = () => {
  const {
    config: { plugins, toolbar }
  } = useConfigContext();

  const options = getToolbarComponents(plugins.options, toolbar.top.options);
  const formattingOption = options.filter(opt => opt.name !== "help");
  const HelpOption = options.filter(opt => opt.name === "help")[0];

  return (
    <Wrapper onMouseDown={e => e.preventDefault()}>
      <ToolbarSection>
        {formattingOption.map((Option, index) => (
          <Fragment key={`top-toolbar-option-${Option.name}`}>
            <Option.toolbarComponent config={toolbar.top[Option.name]} />
            {index < formattingOption.length - 1 && <Separator />}
          </Fragment>
        ))}
      </ToolbarSection>
      {HelpOption && <HelpOption.toolbarComponent />}
    </Wrapper>
  );
};

const Wrapper = styled.div(
  {
    alignItems: "flex-start",
    display: "flex",
    flexWrap: "nowrap",
    justifyContent: "space-between",

    position: "relative",
    padding: 4,

    borderLeft: "none",
    borderRight: "none",
    borderTop: "none",

    userSelect: "none",
    zIndex: "1"
  },
  ({ theme: { constants, toolbar } }) => ({
    backgroundColor: constants.color.background.primary,
    color: constants.color.text.primary,
    borderBottom: constants.border.primary,
    fontSize: constants.fontSize.medium,

    ...toolbar.top({ theme: constants })
  })
);

const ToolbarSection = styled.div({
  alignItems: "center",
  display: "flex",
  flexWrap: "wrap"
});

export default Top;
