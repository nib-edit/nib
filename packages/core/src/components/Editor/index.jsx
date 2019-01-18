import PropTypes from "prop-types";
import React, { Component } from "react";
import { ThemeProvider } from "emotion-theming";

import InnerEditor from "./editor";
import Toolbar from "../Toolbar";
import { Wrapper } from "./style";
import { theme } from "./theme";

import LinkCreateModal from "../../plugins/link/createModal";
import LinkEditModal from "../../plugins/link/editModal";
import { deepMerge, defaultConfig } from "../../common";

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
    return (
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
          <LinkCreateModal editorWrapper={this.editorWrapper} />
          <LinkEditModal editorWrapper={this.editorWrapper} />
        </Wrapper>
      </ThemeProvider>
    );
  }
}

export default Editor;
//todo: put config in context
