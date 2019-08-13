import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import styled from "@emotion/styled";
import { PrimaryButton, Input, Popup } from "nib-ui";

import { linkPluginKey } from "../plugin";
import { PMStateConsumer } from "../../../context/pm-state";

class CreatePopup extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      linkText: this.getSelectedText(),
      href: ""
    };
  }

  updateValue = evt => {
    this.setState({
      [`${evt.target.name}`]: evt.target.value
    });
  };

  getSelectedText = () => {
    const { pmstate } = this.props;
    const { pmview } = pmstate;
    if (!pmview) return "";
    const { state } = pmview;
    const { selection } = state;
    const { $from, $to } = selection;
    return state.doc.textBetween($from.pos, $to.pos);
  };

  addLink = () => {
    const { linkText, href } = this.state;
    if (!linkText || !linkText.length) return;
    const { pmstate } = this.props;
    const { pmview } = pmstate;
    const { state, dispatch } = pmview;
    const { tr, selection } = state;
    const { $from, $to } = selection;
    dispatch(
      tr
        .setMeta("show-add-link-toolbar", false)
        .insertText(linkText, $from.pos, $to.pos)
        .addMark(
          $from.pos,
          $from.pos + linkText.length,
          state.schema.marks.link.create({ href })
        )
    );
    pmview.focus();
    this.closePopup();
  };

  handleKeyDown = evt => {
    if (evt.key === "Enter") {
      this.addLink();
    }
  };

  closePopup = () => {
    const { pmstate } = this.props;
    const { pmview } = pmstate;
    const { state, dispatch } = pmview;
    dispatch(state.tr.setMeta("show-add-link-toolbar", false));
  };

  render() {
    const { linkText, href } = this.state;
    const { editorWrapper, marker } = this.props;
    return (
      <Popup
        closePopup={this.closePopup}
        editorWrapper={editorWrapper}
        marker={marker}
        render={() => (
          <Wrapper>
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
            <PrimaryButton
              onKeyPress={this.handleKeyDown}
              onClick={this.addLink}
            >
              Add
            </PrimaryButton>
            <PrimaryButton onClick={this.closePopup}>Cancel</PrimaryButton>
          </Wrapper>
        )}
      />
    );
  }
}

CreatePopup.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  pmstate: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  editorWrapper: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  marker: PropTypes.object.isRequired
};

export default {
  name: "create_link",
  elmClassName: "nib-link-marker",
  condition: state => {
    const pluginState = linkPluginKey.getState(state);
    return pluginState && pluginState.showAddLinkToolbar;
  },
  component: props => (
    <PMStateConsumer>
      {pmstate => <CreatePopup pmstate={pmstate} {...props} />}
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

const InputWrapper = styled.div({
  "> div:first-of-type": {
    marginBottom: 8
  }
});
