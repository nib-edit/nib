import PropTypes from "prop-types";
import React, { Component } from "react";
import { EditorView } from "prosemirror-view";

import {
  buildEditorState,
  getPluginList,
  getPluginStyles,
  updateEditorState
} from "../../common/editor-helpers";
import { Dispatcher } from "../../common/app-state";
import { ConfigContext } from "../../common/config";

import { StyledEditor } from "./style";

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.editorRef = React.createRef();
  }

  static contextType = ConfigContext;

  static propTypes = {
    config: PropTypes.object,
    defaultValue: PropTypes.object,
    onChange: PropTypes.func,
    updateView: PropTypes.func
  };

  componentDidMount() {
    const { plugins } = this.context.config;
    const { defaultValue, onChange, autofocus } = this.props;
    var state = buildEditorState(
      getPluginList(`${plugins.options} history common`),
      defaultValue
    );
    this.view = new EditorView(this.editorRef.current, {
      state,
      dispatchTransaction: tr => {
        updateEditorState(this.view, tr);
        Dispatcher.dispatch(this.view);
        if (onChange && tr.docChanged) onChange(this.view.state.toJSON().doc);
      }
    });
    if (autofocus) this.view.focus();
    Dispatcher.dispatch(this.view);
  }

  componentWillUnmount() {
    this.view.destroy();
  }

  render() {
    const { spellcheck } = this.props;
    const { plugins } = this.context.config;

    return (
      <StyledEditor
        ref={this.editorRef}
        spellcheck={spellcheck}
        pluginStyles={getPluginStyles(plugins.options)}
      />
    );
  }
}
