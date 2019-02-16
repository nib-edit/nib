import React, { PureComponent } from "react";
import { ToolbarButton, Icons, Separator } from "nib-ui";
import { toggleMark } from "prosemirror-commands";

import { inlinePluginKey } from "./plugins";

class InlineToolbarComponent extends PureComponent {
  toggleMarkofType = evt => {
    const markName = evt.currentTarget.getAttribute("name");
    const { view } = this.props.app_params;
    const { state, dispatch } = view;
    const markType = state.schema.marks[markName];
    toggleMark(markType)(state, dispatch);
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
          <ToolbarButton
            name="strong"
            onClick={this.toggleMarkofType}
            selected={activeMarks.includes("strong")}
          >
            <Icons.Bold />
          </ToolbarButton>
        )}
        <Separator />
        {emEnable && (
          <ToolbarButton
            name="em"
            onClick={this.toggleMarkofType}
            selected={activeMarks.includes("em")}
          >
            <Icons.Italic />
          </ToolbarButton>
        )}
        <Separator />
        {underlineEnable && (
          <ToolbarButton
            name="underline"
            onClick={this.toggleMarkofType}
            selected={activeMarks.includes("underline")}
          >
            <Icons.Underline />
          </ToolbarButton>
        )}
      </>
    );
  }
}

export default InlineToolbarComponent;
