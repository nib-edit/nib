import PropTypes from "prop-types";
import React, { Component } from "react";
import { ThemeProvider } from "emotion-theming";

import FloatWrapper from "../FloatWrapper";
import InnerEditor from "./editor";
import Toolbar from "../Toolbar";
import { Wrapper } from "./style";
import { theme, updateTheme } from "./theme";

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = { view: undefined, updateRef: 0, selMarker: undefined };
  }

  static propTypes = {
    defaultValue: PropTypes.object,
    onChange: PropTypes.func,
    plugins: PropTypes.string,
    theme: PropTypes.object,
    toolbar: PropTypes.object
  };

  static defaultProps = { plugins: "", toolbar: {} };

  updateView = view => {
    const { updateRef } = this.state;
    this.setState({
      view,
      updateRef: updateRef + 1,
      selMarker: document.getElementsByClassName("nib-selected")
    });
  };

  render() {
    const { view, updateRef, selMarker } = this.state;
    const {
      theme: propsTheme,
      toolbar,
      plugins,
      defaultValue,
      onChange
    } = this.props;
    const newTheme = updateTheme(theme, propsTheme);

    return (
      <ThemeProvider theme={newTheme}>
        <Wrapper>
          {toolbar.htop && (
            <Toolbar.htop
              plugins={toolbar.htop}
              updateRef={updateRef}
              view={view}
            />
          )}
          <InnerEditor
            defaultValue={defaultValue}
            onChange={onChange}
            plugins={plugins}
            updateView={this.updateView}
            view={view}
          />
          <FloatWrapper
            selMarker={selMarker && selMarker.item && selMarker.item(0)}
          >
            {toolbar.inline && (
              <Toolbar.inline
                plugins={toolbar.inline}
                updateRef={updateRef}
                view={view}
              />
            )}
          </FloatWrapper>
        </Wrapper>
      </ThemeProvider>
    );
  }
}
