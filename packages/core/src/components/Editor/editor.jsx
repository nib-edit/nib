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
    this.state = { view: undefined };
    this.editorRef = React.createRef();
  }

  static propTypes = {
    config: PropTypes.object,
    defaultValue: PropTypes.object,
    onChange: PropTypes.func,
    updateView: PropTypes.func
  };

  componentDidMount() {
    const { config, defaultValue, onChange, updateView } = this.props;
    var state = buildEditorState(
      getPluginList(`${config.options} selMarker common`),
      defaultValue
    );
    const view = new EditorView(this.editorRef.current, {
      state,
      dispatchTransaction: tr => {
        updateEditorState(view, tr);
        Dispatcher.dispatch(view);
        if (onChange && tr.docChanged) onChange(view.state.toJSON().doc);
      }
    });
    Dispatcher.dispatch(view);
  }

  componentWillUnmount() {
    this.props.view.destroy();
  }

  render() {
    return <StyledEditor ref={this.editorRef} />;
  }
}
