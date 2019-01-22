import PropTypes from "prop-types";
import React, { Component } from "react";
import { EditorView } from "prosemirror-view";

import {
  buildEditorState,
  getPluginList,
  updateEditorState,
  Dispatcher
} from "../../common";
import { StyledEditor } from "./style";

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.editorRef = React.createRef();
  }

  static propTypes = {
    config: PropTypes.object,
    defaultValue: PropTypes.object,
    onChange: PropTypes.func,
    updateView: PropTypes.func
  };

  componentDidMount() {
    const { config, defaultValue, onChange, autofocus } = this.props;
    var state = buildEditorState(
      getPluginList(`${config.options} history selMarker common`),
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
    return <StyledEditor ref={this.editorRef} />;
  }
}
