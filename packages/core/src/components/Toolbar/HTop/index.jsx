import React, { PureComponent } from "react";
import styled from "@emotion/styled";

import { ToolbarSeparator } from "nib-ui";
import { buildMenu } from "../../../common";

export default class HTopToolbar extends PureComponent {
  render() {
    const { config, view, updateRef } = this.props;
    const options = buildMenu(config.options);
    const optionSize = options.length;
    return (
      <Wrapper onMouseDown={e => e.preventDefault()}>
        {options.map((Option, index) => (
          <React.Fragment key={`toolbar-option-${index}`}>
            <Option.menuComponent
              key={`menu-option-${index}`}
              config={config[Option.name]}
              view={view}
              updateRef={updateRef}
            />
            {index < optionSize - 1 && <ToolbarSeparator />}
          </React.Fragment>
        ))}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  padding: 4px;
  background-color: ${({ theme }) => theme.toolbar.htop.backgroundColor};
  color: ${({ theme }) => theme.toolbar.htop.color};

  border-bottom: ${({ theme }) => theme.toolbar.htop.borderBottom};
  border-left: ${({ theme }) => theme.toolbar.htop.borderLeft};
  border-right: ${({ theme }) => theme.toolbar.htop.borderRight};
  border-top: ${({ theme }) => theme.toolbar.htop.borderTop};

  border-bottom-left-radius: ${({ theme }) =>
    theme.toolbar.htop.borderBottomLeftRadius};
  border-bottom-right-radius: ${({ theme }) =>
    theme.toolbar.htop.borderBottomLeftRadius};
  border-top-left-radius: ${({ theme }) =>
    theme.toolbar.htop.borderTopLeftRadius};
  border-top-right-radius: ${({ theme }) =>
    theme.toolbar.htop.borderTopLeftRadius};

  font-size: ${({ theme }) => theme.toolbar.htop.fontSize};
  font-style: ${({ theme }) => theme.toolbar.htop.fontStyle};
  font-family: ${({ theme }) => theme.toolbar.htop.fontFamily};
`;

// TODO: OPTION OF SHOWING LOGIC CAN BE REFACTORED
