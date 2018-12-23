import React, { PureComponent } from "react";
import styled from "@emotion/styled";

import { buildMenu, getPluginList } from "../../../helpers";

export default class InlineToolbar extends PureComponent {
  render() {
    const { plugins, view, updateRef } = this.props;
    const options = buildMenu(getPluginList(plugins));
    return (
      <Wrapper onMouseDown={e => e.preventDefault()}>
        <Arrow />
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
  position: relative;

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

  & button {
    margin-left: ${({ theme }) => theme.toolbar.inline.button.marginLeft};
    border: ${({ theme }) => theme.toolbar.inline.button.border};
    border-radius: ${({ theme }) => theme.toolbar.inline.button.borderRadius};
    background-color: ${({ theme }) =>
      theme.toolbar.inline.button.backgroundColor};
    color: ${({ theme }) => theme.toolbar.inline.button.color};
    height: ${({ theme }) => theme.toolbar.inline.button.height};
    width: ${({ theme }) => theme.toolbar.inline.button.width};
    :hover {
      ${({ theme }) => theme.toolbar.inline.button["&:hover"]};
    }
    ${({ selected, theme }) =>
      selected && theme.toolbar.inline.button["&:selected"]};
  }
`;

const Arrow = styled.div`
  position: absolute;
  top: -7px;
  left: calc(50% - 4px);
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid ${({ theme }) => theme.toolbar.inline.color};
  &:after,
  &:before {
    border: solid transparent;
    content: " ";
    position: absolute;
  }
  &:after {
    border-bottom-color: ${({ theme }) => theme.toolbar.inline.backgroundColor};
    border-width: 6px;
    margin-top: -5px;
    left: -6px;
  }
`;
