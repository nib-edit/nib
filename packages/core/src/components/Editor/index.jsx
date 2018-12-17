import PropTypes from "prop-types";
import React, { Component } from "react";
import { EditorView } from "prosemirror-view";
import { ThemeProvider } from "emotion-theming";

import { StyledEditor, Wrapper } from "./style";
import { buildEditorState, updateEditorState } from "./helpers";
import { buildMenu } from "./helpers";
import { theme, updateTheme } from "./theme";
import { getPluginList } from "../../plugins";
import Toolbar from "../Toolbar";

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = { view: undefined, updateRef: 0 };
    this.editorRef = React.createRef();
  }

  static propTypes = {
    plugins: PropTypes.string,
    toolbar: PropTypes.string,
    theme: PropTypes.object,
    defaultValue: PropTypes.object,
    onChange: PropTypes.func
  };

  static defaultProps = { plugins: "" };

  componentDidMount() {
    var editorState = buildEditorState(getPluginList(this.props.plugins));
    const view = new EditorView(this.editorRef.current, {
      state: editorState,
      dispatchTransaction: tr => {
        const { updateRef } = this.state;
        const { onChange } = this.props;
        updateEditorState(view, tr);
        this.setState({
          updateRef: updateRef + 1
        });
        if (onChange) onChange(view.state.toJSON().doc);
      }
    });
    this.setState({ view });
  }

  componentWillUnmount() {
    this.state.view.destroy();
  }

  render() {
    const { view, updateRef } = this.state;
    const { theme: propsTheme, toolbar } = this.props;
    const ToolbarComponent = Toolbar[toolbar];
    const menuOptions = buildMenu(getPluginList(this.props.plugins));
    const newTheme = updateTheme(theme, propsTheme);
    return (
      <ThemeProvider theme={newTheme}>
        <Wrapper>
          {toolbar && (
            <ToolbarComponent
              options={menuOptions}
              updateRef={updateRef}
              view={view}
            />
          )}
          <StyledEditor ref={this.editorRef} />
        </Wrapper>
      </ThemeProvider>
    );
  }
}
