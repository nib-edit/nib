import React, { PureComponent } from "react";
import styled from "@emotion/styled";

import { buildMenu, getPluginList } from "../../../helpers";

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
  padding: 2px;
  position: relative;
  border-radius: 2px;

  background-color: ${({ theme }) => theme.toolbar.inline.backgroundColor};
  font-style: ${({ theme }) => theme.toolbar.inline.fontStyle};
  font-family: ${({ theme }) => theme.toolbar.inline.fontFamily};

  color: ${({ theme }) => theme.toolbar.inline.color};
`;
