import React, { Component, Fragment } from "react";
import styled from "@emotion/styled";
import { Overlay, ToolbarSeparator } from "nib-ui";

import AppStateWrapper from "../../../common/app-state/AppStateWrapper";
import { getToolbarOptions } from "../../../common/editor-helpers/toolbar-builder";
import { AppContext } from "../../../common/app-context";

class Inline extends Component {
  static contextType = AppContext;

  closeOverlay = () => {
    const { view } = this.props.appParams;
    const { state, dispatch } = view;
    dispatch(state.tr.setMeta("HIDE_OVERLAYS", true));
  };

  render() {
    const { editorWrapper, appParams } = this.props;
    const { plugins, toolbar } = this.context.config;
    const options = getToolbarOptions(plugins.options, toolbar.inline.options);
    const optionSize = options.length;
    const selMarker = document.getElementsByClassName("nib-selected");
    return (
      <div>
        {selMarker[0] ? (
          <StyledOverlay
            closeOverlay={this.closeOverlay}
            editorWrapper={editorWrapper}
            marker={selMarker[0]}
            render={() => (
              <Wrapper onMouseDown={e => e.preventDefault()}>
                {options.map((Option, index) => (
                  <Fragment key={`inline-toolbar-option-${Option.name}`}>
                    <Option.toolbarComponent
                      config={toolbar.inline[Option.name]}
                      appParams={appParams}
                    />
                    {index < optionSize - 1 && <ToolbarSeparator />}
                  </Fragment>
                ))}
              </Wrapper>
            )}
          />
        ) : null}
      </div>
    );
  }
}

export default props => (
  <AppStateWrapper
    render={appParams => <Inline appParams={appParams} {...props} />}
  />
);

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

const StyledOverlay = styled(Overlay)`
  padding: 2px !important;
`;
