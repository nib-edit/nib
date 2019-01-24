import React, { Component } from "react";
import styled from "@emotion/styled";
import { ToolbarSeparator } from "nib-ui";

import { AppStateWrapper } from "../../../common/app-state";
import { buildMenu } from "../../../common/editor-helpers";
import { ConfigContext } from "../../../common/config";

class Top extends Component {
  static contextType = ConfigContext;

  render() {
    const { top: topConfig } = this.context.config.toolbar;
    const options = buildMenu(topConfig.options);
    const optionSize = options.length;
    return (
      <AppStateWrapper
        render={app_params => (
          <Wrapper onMouseDown={e => e.preventDefault()}>
            {options.map((Option, index) => (
              <React.Fragment key={`top-toolbar-option-${Option.name}`}>
                <Option.menuComponent
                  config={topConfig[Option.name]}
                  key={`top-menu-option-${Option.name}`}
                  app_params={app_params}
                />
                {index < optionSize - 1 && <ToolbarSeparator />}
              </React.Fragment>
            ))}
          </Wrapper>
        )}
      />
    );
  }
}

const Wrapper = styled.div`
  align-items: center;
  display: flex;
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

export default Top;
