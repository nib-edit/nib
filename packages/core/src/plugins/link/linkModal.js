import React, { PureComponent } from "react";
import styled from "@emotion/styled";

import { Button } from "nib-ui";
import { linkPluginKey } from "./plugins";
import { Color } from "../../common/color";

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
    const { state, dispatch } = this.props.view;
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
  };

  hideModal = evt => {
    const node = this.linkModalWrapper.current;
    if (!node.contains(evt.target)) {
      const { state, dispatch } = this.props.view;
      dispatch(state.tr.setMeta(linkPluginKey, "HIDE_LINK_TOOLBAR"));
    }
  };

  getSelectedText = () => {
    const { state } = this.props.view;
    const {
      selection: { $from, $to }
    } = state;
    return state.doc.textBetween($from.pos, $to.pos);
  };

  render() {
    const { title, href } = this.state;
    return (
      <LinkPopup ref={this.linkModalWrapper}>
        <div>
          <InputWrapper>
            <label htmlFor="title">Title</label>
            <LinkInput
              name="title"
              onChange={this.updateValue}
              autoFocus
              value={title}
            />
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="href">Href</label>
            <LinkInput name="href" onChange={this.updateValue} value={href} />
          </InputWrapper>
        </div>
        <LinkButton onClick={this.addLink}>Apply</LinkButton>
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
`;

const InputWrapper = styled.div`
  align-items: center;
  display: flex;
`;

const LinkInput = styled.input`
  height: 20px;
  margin: 4px 12px;
  padding: 2px;
  width: 180px;
  &:focus {
    outline: none;
    border: 2px solid ${Color.inputFocus};
  }
`;

const LinkButton = styled(Button)`
  border-radius: 2px;
  padding: 4px 8px;
  font-size: 16px;
  margin-bottom: 4px;
`;
