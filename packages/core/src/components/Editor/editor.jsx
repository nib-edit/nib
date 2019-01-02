import PropTypes from "prop-types";
import React, { Component } from "react";
import { EditorView } from "prosemirror-view";

import {
  buildEditorState,
  updateEditorState,
  getPluginList
} from "../../common";
import { StyledEditor } from "./style";

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
    var state = buildEditorState(
      getPluginList(`${this.props.plugins} selMarker common`),
      defaultValue
    );
    const view = new EditorView(this.editorRef.current, {
      state,
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
