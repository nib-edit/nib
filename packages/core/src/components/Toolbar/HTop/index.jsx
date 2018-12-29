import React, { PureComponent } from "react";
import styled from "@emotion/styled";

import { Separator } from "nib-ui";
import { buildMenu, getPluginList } from "../../../helpers";

export default class HTopToolbar extends PureComponent {
  render() {
    const { plugins, view, updateRef } = this.props;
    const options = buildMenu(getPluginList(plugins));
    const optionSize = options.length;
    return (
      <Wrapper onMouseDown={e => e.preventDefault()}>
        {options.map((Option, index) => (
          <React.Fragment key={`toolbar-option-${index}`}>
            <Option
              key={`menu-option-${index}`}
              view={view}
              updateRef={updateRef}
            />
            {index < optionSize - 1 && <Separator />}
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
  font-style: ${({ theme }) => theme.toolbar.htop.fontStyle};
  font-family: ${({ theme }) => theme.toolbar.htop.fontFamily};

  border-bottom: ${({ theme }) => theme.toolbar.htop.borderBottom};
  border-left: ${({ theme }) => theme.toolbar.htop.borderLeft};
  border-right: ${({ theme }) => theme.toolbar.htop.borderRight};
  border-top: ${({ theme }) => theme.toolbar.htop.borderTop};

  border-top-left-radius: ${({ theme }) =>
    theme.toolbar.htop.borderTopLeftRadius};
  border-top-right-radius: ${({ theme }) =>
    theme.toolbar.htop.borderTopLeftRadius};
  border-bottom-left-radius: ${({ theme }) =>
    theme.toolbar.htop.borderBottomLeftRadius};
  border-bottom-right-radius: ${({ theme }) =>
    theme.toolbar.htop.borderBottomLeftRadius};

  color: ${({ theme }) => theme.toolbar.htop.color};
`;

// TODO: OPTION OF SHOWING LOGIC CAN BE REFACTORED
