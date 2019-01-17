import React, { PureComponent } from "react";
import { Button, Icons, Separator } from "nib-ui";
import { toggleMark } from "prosemirror-commands";

import { inlinePluginKey } from "./plugins";

export default class InlineMenu extends PureComponent {
  toggleMarkofType = evt => {
    const markName = evt.currentTarget.getAttribute("name");
    const { view: { state, dispatch } = {} } = this.props.app_params;
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
    const { view: { state } = {} } = this.props.app_params;
    if (!state) return [];
    const pluginState = inlinePluginKey.getState(state);
    return pluginState && pluginState.activeMarks;
  };

  render() {
    const { options } = this.props.config;
    const activeMarks = this.getActiveMarks();
    const strongEnable = options.indexOf("strong") >= 0;
    const emEnable = options.indexOf("em") >= 0;
    const underlineEnable = options.indexOf("underline") >= 0;
    return (
      <>
        {strongEnable && (
          <Button
            name="strong"
            onClick={this.toggleMarkofType}
            selected={activeMarks.includes("strong")}
          >
            <Icons.Bold />
          </Button>
        )}
        <Separator />
        {emEnable && (
          <Button
            name="em"
            onClick={this.toggleMarkofType}
            selected={activeMarks.includes("em")}
          >
            <Icons.Italic />
          </Button>
        )}
        <Separator />
        {underlineEnable && (
          <Button
            name="underline"
            onClick={this.toggleMarkofType}
            selected={activeMarks.includes("underline")}
          >
            <Icons.Underline />
          </Button>
        )}
      </>
    );
  }
}
