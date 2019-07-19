import PropTypes from "prop-types";
import React, { Component } from "react";
import { ThemeProvider } from "emotion-theming";

import ModalHandler from "../ModalHandler";
import OverlayHandler from "../OverlayHandler";
import Toolbar from "../Toolbar";
import AppStateWrapper from "../../common/app-state/AppStateWrapper";
import { deepMerge } from "../../common/utils/deep-merge";
import { defaultConfig, AppContext } from "../../common/app-context";
import { getPropertyFromPliguns } from "../../common/editor-helpers/plugin-reducer";

import InnerEditor from "./editor";
import { Wrapper } from "./style";
import { blockStyles } from "./blockStyles";
import { theme } from "./theme";
import { getDispatcher } from "../../common/app-state/dispatcher";

class Editor extends Component {
  static propTypes = {
    autofocus: PropTypes.bool,
    blockStyles: PropTypes.object,
    config: PropTypes.object,
    defaultValue: PropTypes.object,
    onChange: PropTypes.func,
    spellcheck: PropTypes.bool,
    theme: PropTypes.object,
    licenseKey: PropTypes.string,
    addons: PropTypes.array
  };

  static defaultProps = {
    autofocus: true,
    spellcheck: false,
    addons: []
  };

  constructor(props) {
    super(props);
    this.config = deepMerge(defaultConfig.config, props.config);
    this.dispatcher = getDispatcher();
    this.theme = deepMerge(theme, props.theme);
    this.theme = {
      ...this.theme,
      blockStyles: deepMerge(blockStyles, props.blockStyles)
    };
    this.editorWrapper = React.createRef();
  }

  render() {
    const {
      defaultValue,
      onChange,
      autofocus,
      spellcheck,
      licenseKey,
      addons
    } = this.props;
    const { toolbar, plugins } = this.config;
    const { config, dispatcher } = this;
    const inlineToolbarPresent = toolbar.options.indexOf("inline") >= 0;
    const topToolbarPresent = toolbar.options.indexOf("top") >= 0;
    const overlays = getPropertyFromPliguns(plugins.options, "overlays");
    const modals = getPropertyFromPliguns(plugins.options, "modals");

    return (
      <AppContext.Provider value={{ config, dispatcher, licenseKey }}>
        <AppStateWrapper
          render={appParams => (
            <ThemeProvider theme={this.theme}>
              <Wrapper id="nib-wrapper" ref={this.editorWrapper}>
                {topToolbarPresent && <Toolbar.top />}
                <InnerEditor
                  view={appParams.view}
                  autoFocus={autofocus}
                  defaultValue={defaultValue}
                  onChange={onChange}
                  spellcheck={spellcheck}
                  addons={addons}
                />
                {inlineToolbarPresent && (
                  <Toolbar.inline editorWrapper={this.editorWrapper} />
                )}
                <OverlayHandler
                  editorWrapper={this.editorWrapper}
                  overlays={overlays}
                  view={appParams.view}
                />
                <ModalHandler
                  editorWrapper={this.editorWrapper}
                  modals={modals}
                  view={appParams.view}
                />
              </Wrapper>
            </ThemeProvider>
          )}
        />
      </AppContext.Provider>
    );
  }
}

export default Editor;
