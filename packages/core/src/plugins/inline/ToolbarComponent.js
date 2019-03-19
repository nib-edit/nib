import React, { Fragment, PureComponent } from "react";
import { ToolbarButton, Icons, Separator } from "nib-ui";
import { toggleMark } from "prosemirror-commands";

import { formatKeymap } from "../../common/utils/key-format";
import { KeymapInfo } from "./keymaps";
import { inlinePluginKey } from "./plugin";

const MarkIcons = {
  strong: "Bold",
  em: "Italic",
  underline: "Underline",
  strike: "Strike"
};

class InlineToolbarComponent extends PureComponent {
  getActiveMarks = () => {
    const { view } = this.props.app_params;
    const { state } = view;
    const pluginState = inlinePluginKey.getState(state);
    return pluginState && pluginState.activeMarks;
  };

  isSubsupMarkActive = (activeMarks, type) => {
    const { marks } = this.props.app_params.view.state.schema;
    return activeMarks.find(
      mark => mark.type === marks.subsup && mark.attrs.type === type
    );
  };

  toggleMarkofType = evt => {
    const markName = evt.currentTarget.getAttribute("name");
    const { view } = this.props.app_params;
    const { state, dispatch } = view;
    const markType = state.schema.marks[markName];
    toggleMark(markType)(state, dispatch);
  };

  toggleSupSubMark = (addMark, removeMark) => {
    const { view } = this.props.app_params;
    const { state, dispatch } = view;
    const { schema, selection, tr } = state;
    const { $from, $to } = selection;
    const { subsup } = schema.marks;
    if (this.isSubsupMarkActive(this.getActiveMarks(), addMark)) {
      dispatch(tr.removeMark($from.pos, $to.pos, state.schema.marks.subsup));
      return;
    }
    if (this.isSubsupMarkActive(this.getActiveMarks(), removeMark)) {
      tr.removeMark($from.pos, $to.pos, state.schema.marks.subsup);
    }
    tr.addMark($from.pos, $to.pos, subsup.create({ type: addMark }));
    dispatch(tr);
  };

  toggleSupMark = () => {
    this.toggleSupSubMark("sup", "sub");
  };

  toggleSubMark = evt => {
    this.toggleSupSubMark("sub", "sup");
  };

  render() {
    if (!this.props.app_params.view) return null;
    const activeMarks = this.getActiveMarks();
    const { marks } = this.props.app_params.view.state.schema;
    const { options } = this.props.config;

    return (
      <>
        {["strong", "em", "underline", "strike"].reduce(
          (result, mark, index) => {
            if (options.indexOf(mark) >= 0) {
              if (!result.length)
                result.push(
                  <Separator key="inlinestyle-separator" type="toolbar" />
                );
              const Icon = Icons[MarkIcons[mark]];
              result.push(
                <Fragment key={`inlinestyle-${index}`}>
                  <ToolbarButton
                    name={mark}
                    onClick={this.toggleMarkofType}
                    selected={marks[mark].isInSet(activeMarks)}
                    title={formatKeymap(KeymapInfo[mark])}
                  >
                    <Icon />
                  </ToolbarButton>
                  <Separator type="toolbar" />
                </Fragment>
              );
            }
            return result;
          },
          []
        )}
        {options.indexOf("subsup") >= 0 && (
          <>
            <ToolbarButton
              name="sup"
              onClick={this.toggleSupMark}
              selected={this.isSubsupMarkActive(activeMarks, "sup")}
              title="Superscript"
            >
              <Icons.Sup />
            </ToolbarButton>
            <Separator type="toolbar" />
            <ToolbarButton
              name="sub"
              onClick={this.toggleSubMark}
              selected={this.isSubsupMarkActive(activeMarks, "sub")}
              title="Subscript"
            >
              <Icons.Sub />
            </ToolbarButton>
          </>
        )}
      </>
    );
  }
}

export default InlineToolbarComponent;
