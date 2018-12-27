import React, { PureComponent } from "react";
import styled from "@emotion/styled";
import { TextSelection } from "prosemirror-state";
import { Button } from "nib-ui";
import { linkPluginKey } from "./plugins";
import { Color } from "../../common/color";
import FloatWrapper from "../../components/FloatWrapper";

class Modal extends PureComponent {
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
    const { view: { state: editorState } = {} } = this.props;
    if (!editorState) return;
    const pluginState = linkPluginKey.getState(editorState);
    return pluginState && pluginState.link;
  };

  getActiveLinkMark = () => {
    const { view } = this.props;
    if (!view) return;
    const link = this.getLink();
    if (!link) return;
    return view.domAtPos(link.from).node.querySelector("a");
  };

  unLink = () => {
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
  };

  removeLink = () => {
    const link = this.getLink();
    const {
      view: { state, dispatch }
    } = this.props;
    dispatch(state.tr.removeMark(link.from, link.to, state.schema.marks.link));
    view.focus();
  };

  render() {
    const link = this.getLink();
    if (!link) return null;
    return (
      <FloatWrapper marker={this.getActiveLinkMark()}>
        <LinkPopup>
          <label htmlFor="href">Href</label>
          <LinkInput
            name="href"
            onChange={this.updateHref}
            defaultValue={link.href}
          />
          <LinkButton onClick={this.updateLink}>Apply</LinkButton>
          <LinkButton onClick={this.unLink}>Unlink</LinkButton>
        </LinkPopup>
      </FloatWrapper>
    );
  }
}

export default Modal;

const LinkPopup = styled.div`
  align-items: center;
  background: white;
  border-radius: 4px;
  border: 1px solid ${Color.border};
  display: flex;
  padding: 5px 10px;
  position: absolute;
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

const LinkButton = styled.a`
  font-size: 14px;
  margin-left: 4px;
  cursor: pointer;
  text-decoration: underline;
`;
