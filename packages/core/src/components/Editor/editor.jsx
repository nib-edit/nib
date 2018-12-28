import PropTypes from "prop-types";
import React, { Component } from "react";
import { EditorView } from "prosemirror-view";

import { StyledEditor } from "./style";
import {
  buildEditorState,
  updateEditorState,
  getPluginList
} from "../../helpers";

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = { view: undefined };
    this.editorRef = React.createRef();
  }

  static propTypes = {
    defaultValue: PropTypes.object,
    onChange: PropTypes.func,
    plugins: PropTypes.string,
    updateView: PropTypes.func
  };

  static defaultProps = { plugins: "" };

  componentDidMount() {
    const { updateView, defaultValue, onChange } = this.props;
    var editorState = buildEditorState(
      getPluginList(`${this.props.plugins} selMarker`),
      defaultValue
    );
    const view = new EditorView(this.editorRef.current, {
      state: editorState,
      dispatchTransaction: tr => {
        updateEditorState(view, tr);
        updateView(view);
        if (onChange && tr.docChanged) onChange(view.state.toJSON().doc);
      }
    });
    updateView(view);
  }

  componentWillUnmount() {
    this.props.view.destroy();
  }

  render() {
    return <StyledEditor ref={this.editorRef} />;
  }
}

// todo: history plugin should always be included
