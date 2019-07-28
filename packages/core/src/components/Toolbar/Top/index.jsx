import React, { Fragment } from "react";
import styled from "@emotion/styled";

import { Separator } from "nib-ui";

import getToolbarComponents from "../../../utils/editor/toolbar";
import { useConfigContext } from "../../../context/config";
import { usePMStateContext } from "../../../context/pm-state";

const Top = () => {
  const {
    config: { plugins, toolbar }
  } = useConfigContext();
  const pmstate = usePMStateContext();

  const options = getToolbarComponents(plugins.options, toolbar.top.options);
  const formattingOption = options.filter(opt => opt.name !== "help");
  const HelpOption = options.filter(opt => opt.name === "help")[0];

  return (
    <Wrapper onMouseDown={e => e.preventDefault()}>
      <ToolbarSection>
        {formattingOption.map((Option, index) => (
          <Fragment key={`top-toolbar-option-${Option.name}`}>
            <Option.toolbarComponent
              config={toolbar.top[Option.name]}
              // use this from context to avoid passing down
              pmstate={pmstate}
            />
            {index < formattingOption.length - 1 && <Separator />}
          </Fragment>
        ))}
      </ToolbarSection>
      {HelpOption && <HelpOption.toolbarComponent pmstate={pmstate} />}
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

    userSelect: "none"
  },
  ({ theme: { constants, toolbar } }) => ({
    backgroundColor: constants.color.background,
    color: constants.color.text,
    borderBottom: constants.border.medium,
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
