import PropTypes from "prop-types";
import React, { Fragment, PureComponent } from "react";
import { ToolbarButton, Icon, Space } from "nib-ui";
import { toggleMark } from "prosemirror-commands";

import { PMStateConsumer } from "../../context/pm-state";
import formatKeymap from "../../utils/format-keymap";
import { KeymapInfo } from "./keymaps";
import { inlinePluginKey } from "./plugin";
import { ConfigContextConsumer } from "../../context/config";

const MarkIcons = {
  strong: "bold",
  em: "italic",
  underline: "underline",
  strike: "strike",
  code: "code"
};

class ToolbarComponent extends PureComponent {
  getActiveMarks = () => {
    const { pmstate } = this.props;
    const { pmview } = pmstate;
    const { state } = pmview;
    const pluginState = inlinePluginKey.getState(state);
    return pluginState && pluginState.activeMarks;
  };

  isSubsupMarkActive = (activeMarks, type) => {
    const { pmstate } = this.props;
    const { pmview } = pmstate;
    const { state } = pmview;
    const { marks } = state.schema;
    return activeMarks.find(
      mark => mark.type === marks.subsup && mark.attrs.type === type
    );
  };

  toggleMarkofType = evt => {
    const { pmstate } = this.props;
    const { pmview } = pmstate;
    const markName = evt.currentTarget.getAttribute("name");
    const { state, dispatch } = pmview;
    const markType = state.schema.marks[markName];
    toggleMark(markType)(state, dispatch);
  };

  toggleSupSubMark = (addedMark, removedMark) => {
    const { pmstate } = this.props;
    const { pmview } = pmstate;
    const { state, dispatch } = pmview;
    const { schema, selection, tr } = state;
    const { $from, $to } = selection;
    const { subsup } = schema.marks;
    if (this.isSubsupMarkActive(this.getActiveMarks(), addedMark)) {
      dispatch(
        tr
          .removeMark($from.pos, $to.pos, state.schema.marks.subsup)
          .removeStoredMark(state.schema.marks.subsup)
      );
      return;
    }
    if (this.isSubsupMarkActive(this.getActiveMarks(), removedMark)) {
      tr.removeMark(
        $from.pos,
        $to.pos,
        state.schema.marks.subsup
      ).removeStoredMark(state.schema.marks.subsup);
    }
    const subSupMark = subsup.create({
      type: addedMark
    });
    tr.addMark($from.pos, $to.pos, subSupMark).setStoredMarks([subSupMark]);
    dispatch(tr);
  };

  toggleCodeMark = () => {
    const { pmstate } = this.props;
    const { state, dispatch } = pmstate.pmview;
    const { schema, selection, tr } = state;
    const { $from, $to } = selection;
    const { marks } = schema;
    const { code } = marks;
    if ((schema, code.isInSet(this.getActiveMarks()))) {
      tr.removeMark($from.pos, $to.pos, code).setStoredMarks([]);
    } else {
      Object.values(marks).forEach(mark => {
        tr.removeMark($from.pos, $to.pos, mark);
      });
      const codeMark = code.create();
      tr.addMark($from.pos, $to.pos, codeMark).setStoredMarks([codeMark]);
    }
    dispatch(tr);
  };

  toggleSupMark = () => {
    this.toggleSupSubMark("sup", "sub");
  };

  toggleSubMark = () => {
    this.toggleSupSubMark("sub", "sup");
  };

  render() {
    const { pmstate, config } = this.props;
    const { pmview } = pmstate;
    if (!pmview) return null;
    const activeMarks = this.getActiveMarks();
    const isSupMarkActive = this.isSubsupMarkActive(activeMarks, "sup");
    const isSubMarkActive = this.isSubsupMarkActive(activeMarks, "sub");

    const { marks } = pmview.state.schema;
    const { options } = config;

    return (
      <>
        {["strong", "em", "underline", "strike"].reduce((result, mark) => {
          if (options.indexOf(mark) >= 0) {
            const isSelected = !!marks[mark].isInSet(activeMarks);
            if (!result.length)
              result.push(<Space key="inlinestyle-separator" />);
            result.push(
              <Fragment key={`inlinestyle-${mark}`}>
                <ToolbarButton
                  name={mark}
                  onClick={this.toggleMarkofType}
                  selected={isSelected}
                  title={formatKeymap(KeymapInfo[mark])}
                >
                  <Icon name={MarkIcons[mark]} selected={isSelected} />
                </ToolbarButton>
                <Space />
              </Fragment>
            );
          }
          return result;
        }, [])}
        {options.indexOf("subsup") >= 0 && (
          <>
            <ToolbarButton
              name="sup"
              onClick={this.toggleSupMark}
              selected={isSupMarkActive}
              title="Superscript"
            >
              <Icon name="sup" selected={isSupMarkActive} />
            </ToolbarButton>
            <Space />
            <ToolbarButton
              name="sub"
              onClick={this.toggleSubMark}
              selected={isSubMarkActive}
              title="Subscript"
            >
              <Icon name="sub" selected={isSubMarkActive} />
            </ToolbarButton>
          </>
        )}
        {options.indexOf("code") >= 0 && (
          <ToolbarButton
            name="code"
            onClick={this.toggleCodeMark}
            selected={!!marks.code.isInSet(activeMarks)}
            title={formatKeymap(KeymapInfo.code)}
          >
            <Icon name="code" selected={!!marks.code.isInSet(activeMarks)} />
          </ToolbarButton>
        )}
      </>
    );
  }
}

ToolbarComponent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  config: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pmstate: PropTypes.object.isRequired
};

export default props => (
  <ConfigContextConsumer>
    {({ config }) => (
      <PMStateConsumer>
        {pmstate => (
          <ToolbarComponent pmstate={pmstate} config={config} {...props} />
        )}
      </PMStateConsumer>
    )}
  </ConfigContextConsumer>
);
