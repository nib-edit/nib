import React, { PureComponent } from "react";
import styled from "@emotion/styled";

import { Link, Input } from "nib-ui";
import { linkPluginKey } from "./plugins";
import { Color } from "../../common/style_constants";

class LinkModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: this.getSelectedText(),
      href: "",
      isMouseDown: false
    };
    this.linkModalWrapper = React.createRef();
  }

  componentWillMount = () => {
    window.addEventListener("mousedown", this.hideModal);
  };

  componentWillUnmount = () => {
    window.removeEventListener("mousedown", this.hideModal);
  };

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
        .setMeta(linkPluginKey, "HIDE_LINK_TOOLBAR")
    );
    view.focus();
  };

  hideModal = evt => {
    const node = this.linkModalWrapper.current;
    if (!node.contains(evt.target)) {
      const { state, dispatch } = this.props.view;
      dispatch(state.tr.setMeta(linkPluginKey, "HIDE_LINK_TOOLBAR"));
    }
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

  render() {
    const { title, href } = this.state;
    return (
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
        <Link onClick={this.addLink}>Apply</Link>
      </LinkPopup>
    );
  }
}

export default LinkModal;

const LinkPopup = styled.div`
  align-items: flex-end;
  background: white;
  border-radius: 4px;
  border: 1px solid ${Color.border};
  display: flex;
  padding: 5px 10px;
  position: absolute;
  font-size: 14px;
`;
