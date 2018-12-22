import React, { PureComponent } from "react";
import styled from "@emotion/styled";

// todo: refactor helpers
import { buildMenu } from "../../Editor/helpers";
import { getPluginList } from "../../../plugins";

export default class InlineToolbar extends PureComponent {
  render() {
    const { plugins, view, updateRef } = this.props;
    const options = buildMenu(getPluginList(plugins));
    return (
      <Wrapper onMouseDown={e => e.preventDefault()}>
        {options.map((Option, index) => (
          <Option
            key={`menu-option-${index}`}
            view={view}
            updateRef={updateRef}
          />
        ))}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  padding: 4px;
  background-color: ${({ theme }) => theme.toolbar.inline.backgroundColor};
  font-style: ${({ theme }) => theme.toolbar.inline.fontStyle};
  font-family: ${({ theme }) => theme.toolbar.inline.fontFamily};

  border-bottom: ${({ theme }) => theme.toolbar.inline.borderBottom};
  border-left: ${({ theme }) => theme.toolbar.inline.borderLeft};
  border-right: ${({ theme }) => theme.toolbar.inline.borderRight};
  border-top: ${({ theme }) => theme.toolbar.inline.borderTop};

  border-top-left-radius: ${({ theme }) =>
    theme.toolbar.inline.borderTopLeftRadius};
  border-top-right-radius: ${({ theme }) =>
    theme.toolbar.inline.borderTopLeftRadius};
  border-bottom-left-radius: ${({ theme }) =>
    theme.toolbar.inline.borderBottomLeftRadius};
  border-bottom-right-radius: ${({ theme }) =>
    theme.toolbar.inline.borderBottomLeftRadius};

  color: ${({ theme }) => theme.toolbar.inline.color};
`;
