import React, { PureComponent } from "react";
import styled from "@emotion/styled";

export default class BasicToolbar extends PureComponent {
  render() {
    const { options, view, updateRef } = this.props;
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
  background-color: ${({ theme }) => theme.toolbar.backgroundColor};
  font-style: ${({ theme }) => theme.toolbar.fontStyle};
  font-family: ${({ theme }) => theme.toolbar.fontFamily};

  border-bottom: ${({ theme }) => theme.toolbar.borderBottom};
  border-left: ${({ theme }) => theme.toolbar.borderLeft};
  border-right: ${({ theme }) => theme.toolbar.borderRight};
  border-top: ${({ theme }) => theme.toolbar.borderTop};

  border-top-left-radius: ${({ theme }) => theme.toolbar.borderTopLeftRadius};
  border-top-right-radius: ${({ theme }) => theme.toolbar.borderTopLeftRadius};
  border-bottom-left-radius: ${({ theme }) =>
    theme.toolbar.borderBottomLeftRadius};
  border-bottom-right-radius: ${({ theme }) =>
    theme.toolbar.borderBottomLeftRadius};

  color: ${({ theme }) => theme.toolbar.color};
`;
