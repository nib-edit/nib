import PropTypes from "prop-types";
import React, { Component } from "react";
import { ThemeProvider } from "emotion-theming";

import InnerEditor from "./editor";
import Toolbar from "../Toolbar";
import { Wrapper } from "./style";
import { theme } from "./theme";

import LinkCreateModal from "../../plugins/link/createModal";
import LinkEditModal from "../../plugins/link/editModal";
import { deepMerge, defaultConfig, AppStateWrapper } from "../../common";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.config = deepMerge(defaultConfig, props.config);
    this.theme = deepMerge(theme, props.theme);
    this.editorWrapper = React.createRef();
  }

  static propTypes = {
    config: PropTypes.object,
    defaultValue: PropTypes.object,
    onChange: PropTypes.func,
    theme: PropTypes.object
  };

  render() {
    const { defaultValue, onChange } = this.props;
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
          <ThemeProvider theme={this.theme}>
            <Wrapper id="nib-wrapper" ref={this.editorWrapper}>
              {topToolbarPresent && <Toolbar.top config={toolbar.top} />}
              <InnerEditor
                defaultValue={defaultValue}
                onChange={onChange}
                config={this.config.plugins}
              />
              {/* todo: create handlar for modals */}
              {inlineToolbarPresent && (
                <Toolbar.inline
                  config={toolbar.inline}
                  editorWrapper={this.editorWrapper}
                />
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
        )}
      />
    );
  }
}

export default Editor;
//todo: put config in context
// todo: put modal into plugin api
