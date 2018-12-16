import React, { PureComponent } from "react";
import { toggleMark } from "prosemirror-commands";
import { Button, Icons } from "@edit/ui";

import { inlinePluginKey } from "./plugins";

class InlineMenu extends PureComponent {
  toggleMarkofType = evt => {
    const markName = evt.currentTarget.getAttribute("name");
    const { view: { state: editorState, dispatch } = {} } = this.props;
    const markType = editorState.schema.marks[markName];
    if (editorState.selection.empty) {
      const marks = editorState.selection.$to.marks();
      if (marks && marks.some(mark => mark.type === markType)) {
        dispatch(editorState.tr.removeStoredMark(markType));
      } else {
        dispatch(editorState.tr.addStoredMark(markType.create()));
      }
    } else {
      toggleMark(markType)(editorState, dispatch);
    }
  };

  getActiveMarks = () => {
    const { view: { state: editorState } = {} } = this.props;
    if (!editorState) return;
    const pluginState = inlinePluginKey.getState(editorState);
    return pluginState && pluginState.activeMarks;
  };

  render() {
    const activeMarks = this.getActiveMarks();
    return (
      <>
        <Button
          name="strong"
          onClick={this.toggleMarkofType}
          selected={activeMarks && activeMarks.indexOf("strong") > -1}
        >
          <Icons.Bold />
        </Button>
        <Button
          name="em"
          onClick={this.toggleMarkofType}
          selected={activeMarks && activeMarks.indexOf("em") > -1}
        >
          <Icons.Italic />
        </Button>
        <Button
          name="underline"
          onClick={this.toggleMarkofType}
          selected={activeMarks && activeMarks.indexOf("underline") > -1}
        >
          <Icons.Underline />
        </Button>
      </>
    );
  }
}

export default [InlineMenu];
