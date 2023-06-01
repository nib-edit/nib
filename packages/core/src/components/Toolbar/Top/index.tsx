import * as React from "react";
import { Fragment, MouseEvent, MutableRefObject } from "react";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";

import { Separator } from "nib-ui";

import getToolbarComponents from "../../../utils/editor/toolbar";
import { Addon } from "../../../types/addon";
import { EditorPlugin } from "../../../types/application";
import { EditorStyle } from "../../../types/editor-style";
import { useConfigContext } from "../../../context/config";
import { usePMStateContext } from "../../../context/pm-state/index";
import { EditorTheme } from "../../../types/editor-theme";

interface TopProps {
  editorWrapper: MutableRefObject<HTMLDivElement | null>;
  addons?: Addon[];
  theme: EditorTheme;
}

const TopToolbar = ({ editorWrapper, addons = [], theme }: TopProps) => {
  const { pmstate } = usePMStateContext();
  if (!pmstate) return null;
  const { pmview } = pmstate;
  if (!pmview) return null;

  const {
    config: { plugins, toolbar },
  } = useConfigContext();

  const options = getToolbarComponents(
    plugins.options,
    toolbar.top.options,
    addons
  );
  const formattingOption = options.filter(
    (opt: EditorPlugin) => opt.name !== "help"
  );
  const HelpOption = options.filter(
    (opt: EditorPlugin) => opt.name === "help"
  )[0];

  return (
    <Wrapper onMouseDown={(e: MouseEvent) => e.preventDefault()}>
      <ToolbarSection>
        {formattingOption.map((Option: EditorPlugin, index: number) => {
          if (!Option.toolbarComponent) return null;
          return (
            <Fragment key={`top-toolbar-option-${Option.name}`}>
              <Option.toolbarComponent
                config={toolbar.top[Option.name]}
                editorWrapper={editorWrapper}
                pmstate={pmstate}
                theme={theme}
              />
              {index < formattingOption.length - 1 && <Separator />}
            </Fragment>
          );
        })}
      </ToolbarSection>
      {HelpOption && HelpOption.toolbarComponent && (
        <HelpOption.toolbarComponent addons={addons} />
      )}
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
  },
  ({ theme: { constants, toolbar } }: { theme: EditorStyle }) => ({
    backgroundColor: constants.color.background.primary,
    color: constants.color.text.primary,
    borderBottom: constants.border.primary,
    fontSize: constants.fontSize.medium,

    ...toolbar!.top!({ theme: constants }),
  })
);

const ToolbarSection = styled.div({
  alignItems: "center",
  display: "flex",
  flexWrap: "wrap",
});

export default withTheme(TopToolbar);
