import PropTypes from "prop-types";
import React, { Component } from "react";
import { EditorView } from "prosemirror-view";

import { StyledEditor } from "./style";
import { buildEditorState, updateEditorState } from "./helpers";
import { getPluginList } from "../../plugins";

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = { view: undefined };
    this.editorRef = React.createRef();
  }

  static propTypes = {
    defaultValue: PropTypes.object,
    plugins: PropTypes.string,
    updateView: PropTypes.func
  };

  static defaultProps = { plugins: "" };

  componentDidMount() {
    const { updateView, defaultValue } = this.props;
    var editorState = buildEditorState(
      getPluginList(`${this.props.plugins} selMarker`),
      defaultValue
    );
    const view = new EditorView(this.editorRef.current, {
      state: editorState,
      dispatchTransaction: tr => {
        updateEditorState(view, tr);
        updateView(view);
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
