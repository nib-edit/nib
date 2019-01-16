import PropTypes from "prop-types";
import React, { Component } from "react";
import { ThemeProvider } from "emotion-theming";

import InnerEditor from "./editor";
import Toolbar from "../Toolbar";
import { Wrapper } from "./style";
import { theme } from "./theme";

import LinkEditModal from "../../plugins/link/editModal";
import LinkCreateModal from "../../plugins/link/createModal";
import { defaultConfig, deepMerge } from "../../common";

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = { view: undefined, updateRef: 0 };
    this.config = deepMerge(defaultConfig, props.config);
    this.theme = deepMerge(theme, props.theme);
  }

  static propTypes = {
    config: PropTypes.object,
    defaultValue: PropTypes.object,
    onChange: PropTypes.func,
    theme: PropTypes.object
  };

  updateView = view => {
    const { updateRef } = this.state;
    this.setState({
      updateRef: updateRef + 1,
      view
    });
  };

  render() {
    const { view, updateRef } = this.state;
    const { defaultValue, onChange } = this.props;
    const { toolbar } = this.config;
    const inlineToolbarPresent = toolbar.options.indexOf("inline") >= 0;
    const topToolbarPresent = toolbar.options.indexOf("top") >= 0;
    return (
      <ThemeProvider theme={this.theme}>
        <Wrapper id="nib-wrapper">
          {topToolbarPresent && (
            <Toolbar.top
              config={toolbar.top}
              updateRef={updateRef}
              view={view}
            />
          )}
          <InnerEditor
            defaultValue={defaultValue}
            onChange={onChange}
            config={this.config.plugins}
            updateView={this.updateView}
            view={view}
          />
          {/* todo: create handlar for modals */}
          {inlineToolbarPresent && (
            <Toolbar.inline
              config={toolbar.inline}
              updateRef={updateRef}
              view={view}
            />
          )}
          <LinkCreateModal view={view} updateRef={updateRef} />
          <LinkEditModal view={view} updateRef={updateRef} />
        </Wrapper>
      </ThemeProvider>
    );
  }
}
