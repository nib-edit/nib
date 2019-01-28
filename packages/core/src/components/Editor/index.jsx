import PropTypes from "prop-types";
import React, { Component } from "react";
import { ThemeProvider } from "emotion-theming";

import LinkCreateModal from "../../plugins/link/createModal";
import LinkEditModal from "../../plugins/link/editModal";
import { AppStateWrapper } from "../../common/app-state";
import { deepMerge } from "../../common/utils";
import { defaultConfig, ConfigContext } from "../../common/config";
import Toolbar from "../Toolbar";

import InnerEditor from "./editor";
import { Wrapper } from "./style";
import { blockStyles } from "./blockStyles";
import { theme } from "./theme";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.config = deepMerge(defaultConfig, props.config);
    this.theme = deepMerge(theme, props.theme);
    this.theme = {
      ...this.theme,
      blockStyles: deepMerge(blockStyles, props.blockStyles)
    };
    this.editorWrapper = React.createRef();
  }

  static propTypes = {
    autofocus: PropTypes.bool,
    blockStyles: PropTypes.object,
    config: PropTypes.object,
    defaultValue: PropTypes.object,
    onChange: PropTypes.func,
    theme: PropTypes.object
  };

  render() {
    const { defaultValue, onChange, autofocus } = this.props;
    const { toolbar } = this.config;
    const inlineToolbarPresent = toolbar.options.indexOf("inline") >= 0;
    const topToolbarPresent = toolbar.options.indexOf("top") >= 0;
    const linkMarker = document.getElementsByClassName("nib-link-marker");
    const editLinkMarker = document.getElementsByClassName(
      "nib-edit-link-marker"
    );
    return (
      <AppStateWrapper
        render={app_params => (
          <ConfigContext.Provider value={{ config: this.config }}>
            <ThemeProvider theme={this.theme}>
              <Wrapper id="nib-wrapper" ref={this.editorWrapper}>
                {topToolbarPresent && <Toolbar.top />}
                <InnerEditor
                  autoFocus={autofocus}
                  defaultValue={defaultValue}
                  onChange={onChange}
                />
                {/* todo: create handlar for modals */}
                {inlineToolbarPresent && (
                  <Toolbar.inline editorWrapper={this.editorWrapper} />
                )}
                {linkMarker[0] && (
                  <LinkCreateModal
                    editorWrapper={this.editorWrapper}
                    linkMarker={linkMarker[0]}
                    view={app_params.view}
                  />
                )}
                {editLinkMarker[0] && (
                  <LinkEditModal
                    editorWrapper={this.editorWrapper}
                    editLinkMarker={editLinkMarker[0]}
                    view={app_params.view}
                  />
                )}
              </Wrapper>
            </ThemeProvider>
          </ConfigContext.Provider>
        )}
      />
    );
  }
}

export default Editor;
// todo: put modal into plugin api
