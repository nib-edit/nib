import React, { Component } from "react";
import styled from "@emotion/styled";
import { Modal, ToolbarSeparator } from "nib-ui";

import { AppStateWrapper } from "../../../common/app-state";
import { getToolbarOptions } from "../../../common/editor-helpers";
import { ConfigContext } from "../../../common/config";

class Inline extends Component {
  static contextType = ConfigContext;

  closeModal = () => {
    const { view } = this.props.app_params;
    const { state, dispatch } = view;
    dispatch(state.tr.setMeta("HIDE_MODALS", true));
  };

  render() {
    const { editorWrapper, app_params } = this.props;
    const { inline: inlineConfig } = this.context.config.toolbar;
    const options = getToolbarOptions(inlineConfig.options);
    const optionSize = options.length;
    const selMarker = document.getElementsByClassName("nib-selected");
    return (
      <div>
        {selMarker[0] ? (
          <Modal
            marker={selMarker[0]}
            editorWrapper={editorWrapper}
            closeModal={this.closeModal}
          >
            <Wrapper onMouseDown={e => e.preventDefault()}>
              {options.map((Option, index) => (
                <React.Fragment key={`inline-toolbar-option-${Option.name}`}>
                  <Option.toolbarComponent
                    config={inlineConfig[Option.name]}
                    key={`inline-toolbar-option-${Option.name}`}
                    app_params={app_params}
                  />
                  {index < optionSize - 1 && <ToolbarSeparator />}
                </React.Fragment>
              ))}
            </Wrapper>
          </Modal>
        ) : null}
      </div>
    );
  }
}

export default props => (
  <AppStateWrapper
    render={app_params => <Inline app_params={app_params} {...props} />}
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
