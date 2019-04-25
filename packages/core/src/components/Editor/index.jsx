import PropTypes from "prop-types";
import React, {Component} from "react";
import {ThemeProvider} from "emotion-theming";

import ModalHandler from "../ModalHandler";
import OverlayHandler from "../OverlayHandler";
import Toolbar from "../Toolbar";
import {AppStateWrapper} from "../../common/app-state";
import {deepMerge} from "../../common/utils/deep-merge";
import {defaultConfig, ConfigContext} from "../../common/config";
import {getPropertyFromPliguns} from "../../common/editor-helpers";

import InnerEditor from "./editor";
import {Wrapper} from "./style";
import {blockStyles} from "./blockStyles";
import {theme} from "./theme";

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
    spellcheck: PropTypes.bool,
    theme: PropTypes.object
  };

  render() {
    const {defaultValue, onChange, autofocus, spellcheck} = this.props;
    const {toolbar, plugins} = this.config;
    const inlineToolbarPresent = toolbar.options.indexOf("inline") >= 0;
    const topToolbarPresent = toolbar.options.indexOf("top") >= 0;
    const overlays = getPropertyFromPliguns(plugins.options, "overlays");
    const modals = getPropertyFromPliguns(plugins.options, "modals");
    return (
      <AppStateWrapper
        render={app_params => (
          <ConfigContext.Provider value={{config: this.config}}>
            <ThemeProvider theme={this.theme}>
              <Wrapper id="nib-wrapper" ref={this.editorWrapper}>
                {topToolbarPresent && <Toolbar.top />}
                <InnerEditor
                  autoFocus={autofocus}
                  defaultValue={defaultValue}
                  onChange={onChange}
                  spellcheck={spellcheck}
                />
                {inlineToolbarPresent && (
                  <Toolbar.inline editorWrapper={this.editorWrapper} />
                )}
                <OverlayHandler
                  editorWrapper={this.editorWrapper}
                  overlays={overlays}
                  view={app_params.view}
                />
                <ModalHandler
                  editorWrapper={this.editorWrapper}
                  modals={modals}
                  view={app_params.view}
                />
              </Wrapper>
            </ThemeProvider>
          </ConfigContext.Provider>
        )}
      />
    );
  }
}

export default Editor;
