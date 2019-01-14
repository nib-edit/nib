import React, { PureComponent } from "react";
import styled from "@emotion/styled";

import { Link, Input, Modal } from "nib-ui";

class LinkModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // todo: title to reset when modal opens
      title: this.getSelectedText(),
      href: "",
      isMouseDown: false
    };
    this.linkModalWrapper = React.createRef();
  }

  updateValue = evt => {
    this.setState({
      [`${evt.target.name}`]: evt.target.value
    });
  };

  addLink = () => {
    const { title, href } = this.state;
    if (!title || !title.length) return;
    const { view } = this.props;
    const { state, dispatch } = view;
    const {
      tr,
      selection: { $from, $to }
    } = state;
    dispatch(
      tr
        .insertText(title, $from.pos, $to.pos)
        .addMark(
          $from.pos,
          $from.pos + title.length,
          state.schema.marks.link.create({ href })
        )
        .setMeta("SHOW_LINK_TOOLBAR", false)
    );
    view.focus();
    this.closeModal();
  };

  getSelectedText = () => {
    const { view } = this.props;
    if (!view) return "";
    const { state } = view;
    const {
      selection: { $from, $to }
    } = state;
    return state.doc.textBetween($from.pos, $to.pos);
  };

  handleKeyDown = evt => {
    if (evt.key === "Enter") {
      this.addLink();
    }
  };

  closeModal = () => {
    const { view } = this.props;
    const { state, dispatch } = view;
    dispatch(state.tr.setMeta("SHOW_LINK_TOOLBAR", false));
    this.setState({
      title: "",
      href: ""
    });
  };

  render() {
    const linkMarker = document.getElementsByClassName("nib-link-marker");
    const { title, href } = this.state;
    return (
      <Modal
        marker={linkMarker && linkMarker.item && linkMarker.item(0)}
        closeModal={this.closeModal}
      >
        <LinkPopup ref={this.linkModalWrapper}>
          <div>
            <Input
              autoFocus
              label="Title"
              name="title"
              onChange={this.updateValue}
              onKeyPress={this.handleKeyDown}
              value={title}
            />
            <Input
              label="Href"
              name="href"
              onChange={this.updateValue}
              onKeyPress={this.handleKeyDown}
              value={href}
            />
          </div>
          <StyledLink onClick={this.addLink}>Apply</StyledLink>
        </LinkPopup>
      </Modal>
    );
  }
}

export default LinkModal;

const LinkPopup = styled.div`
  align-items: flex-end;
  background: white;
  border-radius: 4px;
  display: flex;
  padding: 5px 10px;
  font-size: 14px;
`;

const StyledLink = styled(Link)`
  margin: 4px 0;
`;

// todo: apply link above should be tab-able
// todo: inputs to show selected value always
// rendering logic should not unnecessary run if there is no marker
