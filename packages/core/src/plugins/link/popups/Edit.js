import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import styled from "@emotion/styled";
import { TextSelection } from "prosemirror-state";

import { PrimaryButton, Input, Popup, Space, SpaceSize } from "nib-ui";

import { PMStateConsumer } from "../../../context/pm-state";
import { linkPluginKey } from "../plugin";

class EditPopup extends PureComponent {
  constructor(props) {
    super(props);
    const link = this.getLink();
    this.state = {
      href: link.href
    };
  }

  updateHref = evt => {
    this.setState({
      href: evt.target.value
    });
  };

  getLink = () => {
    const { pmstate } = this.props;
    const { pmview } = pmstate;
    if (!pmview) return undefined;
    const { state } = pmview;
    const pluginState = linkPluginKey.getState(state);
    return pluginState && pluginState.link;
  };

  updateLink = () => {
    const link = this.getLink();
    const { pmstate } = this.props;
    const { pmview } = pmstate;
    const { state, dispatch } = pmview;
    const { href } = this.state;
    dispatch(
      state.tr
        .setSelection(TextSelection.create(state.tr.doc, link.to))
        .removeMark(link.from, link.to, state.schema.marks.link)
        .addMark(link.from, link.to, state.schema.marks.link.create({ href }))
    );
    this.closePopup();
    pmview.focus();
  };

  unLink = () => {
    const link = this.getLink();
    const { pmstate } = this.props;
    const { pmview } = pmstate;
    const { state, dispatch } = pmview;
    dispatch(state.tr.removeMark(link.from, link.to, state.schema.marks.link));
    pmview.focus();
    this.closePopup();
  };

  closePopup = () => {
    const { pmstate } = this.props;
    const { pmview } = pmstate;
    const { state, dispatch } = pmview;
    dispatch(state.tr.setMeta("show-edit-link-toolbar", false));
  };

  render() {
    const link = this.getLink();
    if (!link) return null;
    const { editorWrapper, marker } = this.props;
    return (
      <Popup
        onEscKeyPress={this.closePopup}
        onClickOutsideEditor={this.closePopup}
        editorWrapper={editorWrapper}
        marker={marker}
        render={() => (
          <Wrapper>
            <Input
              placeholder="Url"
              name="href"
              onChange={this.updateHref}
              defaultValue={link.href}
            />
            <PrimaryButton onClick={this.updateLink}>Update</PrimaryButton>
            <Space size={SpaceSize.l} />
            <PrimaryButton onClick={this.unLink}>Unlink</PrimaryButton>
          </Wrapper>
        )}
      />
    );
  }
}

EditPopup.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  pmstate: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  editorWrapper: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  marker: PropTypes.object.isRequired
};

export default {
  name: "edit_link",
  getMarker: () => document.getElementsByClassName("nib-edit-link-marker")[0],
  component: props => (
    <PMStateConsumer>
      {pmstate => <EditPopup pmstate={pmstate} {...props} />}
    </PMStateConsumer>
  )
};

const Wrapper = styled.div(
  {
    alignItems: "center",
    display: "flex",
    padding: 4
  },
  ({ theme: { constants } }) => ({
    borderRadius: constants.borderRadius,
    fontSize: constants.fontSize.medium
  })
);

// todo: in-case of inline toolbars edit link options should be merged with the toolbar.
