import React, { PureComponent } from "react";
import styled from "@emotion/styled";

// todo: refactor helpers
import { buildMenu } from "../../Editor/helpers";
import { getPluginList } from "../../../plugins";

export default class HTopToolbar extends PureComponent {
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

  & button {
    margin-left: ${({ theme }) => theme.toolbar.htop.button.marginLeft};
    border: ${({ theme }) => theme.toolbar.htop.button.border};
    border-radius: ${({ theme }) => theme.toolbar.htop.button.borderRadius};
    background-color: ${({ theme }) =>
      theme.toolbar.htop.button.backgroundColor};
    color: ${({ theme }) => theme.toolbar.htop.button.color};
    height: ${({ theme }) => theme.toolbar.htop.button.height};
    width: ${({ theme }) => theme.toolbar.htop.button.width};
    :hover {
      ${({ theme }) => theme.toolbar.htop.button["&:hover"]};
    }
    ${({ selected, theme }) =>
      selected && theme.toolbar.htop.button["&:selected"]};
  }
`;
