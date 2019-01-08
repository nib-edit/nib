import React, { PureComponent } from "react";
import styled from "@emotion/styled";

import { ToolbarSeparator } from "nib-ui";
import { buildMenu } from "../../../common";

export default class InlineToolbar extends PureComponent {
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
  position: relative;

  background-color: ${({ theme }) => theme.toolbar.inline.backgroundColor};
  color: ${({ theme }) => theme.toolbar.inline.color};

  border-bottom: ${({ theme }) => theme.toolbar.inline.borderBottom};
  border-left: ${({ theme }) => theme.toolbar.inline.borderLeft};
  border-right: ${({ theme }) => theme.toolbar.inline.borderRight};
  border-top: ${({ theme }) => theme.toolbar.inline.borderTop};

  border-bottom-left-radius: ${({ theme }) =>
    theme.toolbar.inline.borderBottomLeftRadius};
  border-bottom-right-radius: ${({ theme }) =>
    theme.toolbar.inline.borderBottomLeftRadius};
  border-top-left-radius: ${({ theme }) =>
    theme.toolbar.inline.borderTopLeftRadius};
  border-top-right-radius: ${({ theme }) =>
    theme.toolbar.inline.borderTopLeftRadius};

  padding: ${({ theme }) => theme.toolbar.inline.padding};

  font-size: ${({ theme }) => theme.toolbar.inline.fontSize};
  font-style: ${({ theme }) => theme.toolbar.inline.fontStyle};
  font-family: ${({ theme }) => theme.toolbar.inline.fontFamily};
`;
