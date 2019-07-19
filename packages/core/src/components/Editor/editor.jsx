import PropTypes from "prop-types";
import React, { Component } from "react";
import { EditorView } from "prosemirror-view";

import { getPluginStyles } from "../../common/editor-helpers/styles";
import { getPluginList } from "../../common/editor-helpers/plugin";
import {
  buildEditorState,
  updateEditorState
} from "../../common/editor-helpers/editor-state";
import { AppContext } from "../../common/app-context";

import { StyledEditor } from "./style";

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.editorRef = React.createRef();
  }

  static contextType = AppContext;

  static propTypes = {
    config: PropTypes.object,
    defaultValue: PropTypes.object,
    onChange: PropTypes.func,
    updateView: PropTypes.func
  };

  componentDidMount() {
    const { plugins } = this.context.config;
    const { defaultValue, onChange, autofocus, addons } = this.props;
    const state = buildEditorState(
      getPluginList(`${plugins.options} history common`).concat(
        addons.map(addon => addon.plugin)
      ),
      defaultValue
    );
    this.view = new EditorView(this.editorRef.current, {
      state,
      dispatchTransaction: tr => {
        updateEditorState(this.view, tr);
        this.updateViewListeners();
        if (onChange && tr.docChanged) onChange(this.view.state.toJSON().doc);
      }
    });
    if (autofocus) this.view.focus();
    this.updateViewListeners();
  }

  componentWillUnmount() {
    this.view.destroy();
  }

  updateViewListeners = () => {
    const { addons } = this.props;
    const { dispatcher } = this.context;
    dispatcher.dispatch(this.view);
    addons.forEach(addon => {
      addon.listener(this.view);
    });
  };

  render() {
    const { spellcheck, view } = this.props;
    const { plugins } = this.context.config;

    return (
      <StyledEditor
        onClick={() => view.focus()}
        pluginStyles={getPluginStyles(plugins.options)}
        ref={this.editorRef}
        spellcheck={spellcheck}
      />
    );
  }
}
