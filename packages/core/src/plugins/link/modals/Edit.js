import React, { PureComponent } from "react";
import styled from "@emotion/styled";
import { TextSelection } from "prosemirror-state";
import { LinkButton, Input, Modal, Separator } from "nib-ui";
import { linkPluginKey } from "../plugin";

class EditModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      href: "",
      isMouseDown: false
    };
  }

  updateHref = evt => {
    this.setState({
      href: evt.target.value
    });
  };

  getLink = () => {
    const { view: { state } = {} } = this.props;
    if (!state) return;
    const pluginState = linkPluginKey.getState(state);
    return pluginState && pluginState.link;
  };

  getActiveLinkMark = () => {
    const { view } = this.props;
    if (!view) return;
    const link = this.getLink();
    if (!link) return;
    return view.domAtPos(link.from).node.querySelector("a");
  };

  updateLink = () => {
    const link = this.getLink();
    const {
      view: { state, dispatch }
    } = this.props;
    dispatch(
      state.tr
        .removeMark(link.from, link.to, state.schema.marks.link)
        .addMark(
          link.from,
          link.to,
          state.schema.marks.link.create({ href: this.state.href })
        )
        .setSelection(new TextSelection(state.doc.resolve(link.to)))
    );
    this.closeModal();
  };

  unLink = () => {
    const link = this.getLink();
    const { view } = this.props;
    const { state, dispatch } = view;
    dispatch(state.tr.removeMark(link.from, link.to, state.schema.marks.link));
    view.focus();
    this.closeModal();
  };

  closeModal = () => {
    const { view } = this.props;
    const { state, dispatch } = view;
    dispatch(state.tr.setMeta("HIDE_EDIT_LINK_TOOLBAR", true));
  };

  render() {
    const link = this.getLink();
    if (!link) return null;
    const { editorWrapper, marker } = this.props;
    return (
      <Modal
        marker={marker}
        closeModal={this.closeModal}
        editorWrapper={editorWrapper}
      >
        <LinkPopup>
          <label htmlFor="href">Href</label>
          <Input
            name="href"
            onChange={this.updateHref}
            defaultValue={link.href}
          />
          <LinkButton onClick={this.updateLink}>Apply</LinkButton>
          <Separator />
          <LinkButton onClick={this.unLink}>Unlink</LinkButton>
        </LinkPopup>
      </Modal>
    );
  }
}

export default {
  elmClassName: "nib-edit-link-marker",
  component: EditModal
};

const LinkPopup = styled.div`
  align-items: center;
  background: white;
  border-radius: 4px;
  display: flex;
  padding: 5px 10px;
  font-size: 14px;
`;
