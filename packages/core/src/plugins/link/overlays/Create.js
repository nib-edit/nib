import React, { PureComponent } from "react";
import styled from "@emotion/styled";
import { LinkButton, Input, Overlay } from "nib-ui";

import { linkPluginKey } from "../plugin";

class CreateOverlay extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      linkText: this.getSelectedText(),
      href: "",
      isMouseDown: false
    };
    this.overlayWrapper = React.createRef();
  }

  updateValue = evt => {
    this.setState({
      [`${evt.target.name}`]: evt.target.value
    });
  };

  addLink = () => {
    const { linkText, href } = this.state;
    if (!linkText || !linkText.length) return;
    const { view } = this.props;
    const { state, dispatch } = view;
    const {
      tr,
      selection: { $from, $to }
    } = state;
    dispatch(
      tr
        .insertText(linkText, $from.pos, $to.pos)
        .addMark(
          $from.pos,
          $from.pos + linkText.length,
          state.schema.marks.link.create({ href })
        )
        .setMeta("SHOW_LINK_TOOLBAR", false)
    );
    view.focus();
    this.closeOverlay();
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

  closeOverlay = () => {
    const { view } = this.props;
    const { state, dispatch } = view;
    dispatch(state.tr.setMeta("HIDE_LINK_TOOLBAR", true));
  };

  render() {
    const { linkText, href } = this.state;
    const { editorWrapper, marker } = this.props;
    return (
      <Overlay
        closeOverlay={this.closeOverlay}
        editorWrapper={editorWrapper}
        marker={marker}
        render={() => (
          <LinkPopup ref={this.overlayWrapper}>
            <InputWrapper>
              <Input
                autoFocus
                placeholder="Text"
                name="linkText"
                onChange={this.updateValue}
                onKeyPress={this.handleKeyDown}
                value={linkText}
              />
              <Input
                placeholder="Href"
                name="href"
                onChange={this.updateValue}
                onKeyPress={this.handleKeyDown}
                value={href}
              />
            </InputWrapper>
            <StyledLinkButton onClick={this.addLink}>Add</StyledLinkButton>
          </LinkPopup>
        )}
      />
    );
  }
}

export default {
  elmClassName: "nib-link-marker",
  condition: state => {
    const pluginState = linkPluginKey.getState(state);
    return pluginState && pluginState.showAddLinkToolbar;
  },
  component: CreateOverlay
};

const LinkPopup = styled.div`
  align-items: center;
  border-radius: 4px;
  display: flex;
  padding: 4px;
  font-size: 14px;
`;

const InputWrapper = styled.div`
  > div:first-of-type {
    margin-bottom: 8px;
  }
`;

const StyledLinkButton = styled(LinkButton)`
  margin: 4px 0;
  background: ${({ theme }) => theme.overlay.backgroundColor};
  :hover {
    color: ${({ theme }) => theme.overlay.highlight};
  }
`;
