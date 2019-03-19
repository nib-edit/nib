import React, { Component, Fragment } from "react";
import styled from "@emotion/styled";
import { ToolbarSeparator } from "nib-ui";

import { AppStateWrapper } from "../../../common/app-state";
import { getToolbarOptions } from "../../../common/editor-helpers";
import { ConfigContext } from "../../../common/config";

const HelpOption = ({ options, app_params }) => {
  const helpOption = options.filter(opt => opt.name === "help");
  if (!helpOption.length) return null;
  const HelpComponent = helpOption[0].toolbarComponent;
  return <HelpComponent app_params={app_params} />;
};

class Top extends Component {
  static contextType = ConfigContext;

  render() {
    const { top: topConfig } = this.context.config.toolbar;
    const options = getToolbarOptions(topConfig.options);
    const formattingOption = options.filter(opt => opt.name !== "help");
    const optionSize = formattingOption.length;
    return (
      <AppStateWrapper
        render={app_params => (
          <Wrapper onMouseDown={e => e.preventDefault()}>
            <ToolbarSection>
              {formattingOption.map((Option, index) => (
                <Fragment key={`top-toolbar-option-${Option.name}`}>
                  <Option.toolbarComponent
                    config={topConfig[Option.name]}
                    app_params={app_params}
                  />
                  {index < optionSize - 1 && <ToolbarSeparator />}
                </Fragment>
              ))}
            </ToolbarSection>
            <HelpOption options={options} app_params={app_params} />
          </Wrapper>
        )}
      />
    );
  }
}

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 4px;
  background-color: ${({ theme }) => theme.toolbar.top.backgroundColor};
  color: ${({ theme }) => theme.toolbar.top.color};

  border-bottom: ${({ theme }) => theme.toolbar.top.borderBottom};
  border-left: ${({ theme }) => theme.toolbar.top.borderLeft};
  border-right: ${({ theme }) => theme.toolbar.top.borderRight};
  border-top: ${({ theme }) => theme.toolbar.top.borderTop};

  border-bottom-left-radius: ${({ theme }) =>
    theme.toolbar.top.borderBottomLeftRadius};
  border-bottom-right-radius: ${({ theme }) =>
    theme.toolbar.top.borderBottomLeftRadius};
  border-top-left-radius: ${({ theme }) =>
    theme.toolbar.top.borderTopLeftRadius};
  border-top-right-radius: ${({ theme }) =>
    theme.toolbar.top.borderTopLeftRadius};

  font-size: ${({ theme }) => theme.toolbar.top.fontSize};
  font-style: ${({ theme }) => theme.toolbar.top.fontStyle};
  font-family: ${({ theme }) => theme.toolbar.top.fontFamily};
`;

const ToolbarSection = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
`;

export default Top;
