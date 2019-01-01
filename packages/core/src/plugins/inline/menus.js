import React, { PureComponent } from "react";
import { toggleMark } from "prosemirror-commands";
import { Button, Icons, ButtonSeparator } from "nib-ui";

import { inlinePluginKey } from "./plugins";

class InlineMenu extends PureComponent {
  toggleMarkofType = evt => {
    const markName = evt.currentTarget.getAttribute("name");
    const { view: { state, dispatch } = {} } = this.props;
    const markType = state.schema.marks[markName];
    if (state.selection.empty) {
      const marks = state.selection.$to.marks();
      if (marks && marks.some(mark => mark.type === markType)) {
        dispatch(state.tr.removeStoredMark(markType));
      } else {
        dispatch(state.tr.addStoredMark(markType.create()));
      }
    } else {
      toggleMark(markType)(state, dispatch);
    }
  };

  getActiveMarks = () => {
    const { view: { state } = {} } = this.props;
    if (!state) return [];
    const pluginState = inlinePluginKey.getState(state);
    return pluginState && pluginState.activeMarks;
  };

  render() {
    const activeMarks = this.getActiveMarks();
    return (
      <>
        <Button
          name="strong"
          onClick={this.toggleMarkofType}
          selected={activeMarks.includes("strong")}
        >
          <Icons.Bold />
        </Button>
        <ButtonSeparator />
        <Button
          name="em"
          onClick={this.toggleMarkofType}
          selected={activeMarks.includes("em")}
        >
          <Icons.Italic />
        </Button>
        <ButtonSeparator />
        <Button
          name="underline"
          onClick={this.toggleMarkofType}
          selected={activeMarks.includes("underline")}
        >
          <Icons.Underline />
        </Button>
      </>
    );
  }
}

export default InlineMenu;
