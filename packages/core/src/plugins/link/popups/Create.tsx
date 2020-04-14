import * as React from 'react';
import { ChangeEvent, MutableRefObject, PureComponent } from 'react';
import styled from '@emotion/styled';
import { EditorState } from 'prosemirror-state';

import { PrimaryButton, Input, Popup } from 'nib-ui';

import { PMStateConsumer } from '../../../context/pm-state';
import { ProsemirrorEditorState } from '../../../types/prosemirror';
import { EditorStyle } from '../../../types/editor-style';
import { linkPluginKey } from '../plugin';

interface CreatePopupProps {
  pmstate: ProsemirrorEditorState;
  editorWrapper: MutableRefObject<HTMLDivElement | null>;
  marker: Element;
}

interface CreatePopupState {
  linkText?: string;
  href?: string;
  linkTextRequiredError?: boolean;
}

class CreatePopup extends PureComponent<CreatePopupProps, CreatePopupState> {
  constructor(props: CreatePopupProps) {
    super(props);
    this.state = {
      linkText: this.getSelectedText(),
      href: '',
      linkTextRequiredError: false
    };
  }

  updateValue = (evt: ChangeEvent) => {
    const { name, value } = evt.target as HTMLInputElement;
    const newState: CreatePopupState = {
      [`${name}`]: value
    };
    if (name === 'linkText' && value) {
      newState.linkTextRequiredError = false;
    }
    this.setState(newState);
  };

  getSelectedText = () => {
    const { pmstate } = this.props;
    const { pmview } = pmstate;
    if (!pmview) return '';
    const { state } = pmview;
    const { selection } = state;
    const { $from, $to } = selection;
    return state.doc.textBetween($from.pos, $to.pos);
  };

  addLink = () => {
    const { linkText, href } = this.state;
    if (!linkText || !linkText.length) {
      this.setState({ linkTextRequiredError: true });
      return;
    }
    this.setState({ linkTextRequiredError: false });
    const { pmstate } = this.props;
    const { pmview } = pmstate;
    const { state, dispatch } = pmview;
    const { tr, selection } = state;
    const { $from, $to } = selection;
    dispatch(
      tr
        .setMeta('show-add-link-toolbar', false)
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

  handleKeyDown = (evt: KeyboardEvent) => {
    if (evt.key === 'Enter') {
      this.addLink();
    }
  };

  closePopup = () => {
    const { pmstate } = this.props;
    const { pmview } = pmstate;
    const { state, dispatch } = pmview;
    dispatch(state.tr.setMeta('show-add-link-toolbar', false));
  };

  render() {
    const { linkText, href, linkTextRequiredError } = this.state;
    const { editorWrapper, marker } = this.props;
    return (
      <Popup
        onEscKeyPress={this.closePopup}
        onClickOutsideEditor={this.closePopup}
        onClickInsideEditor={this.closePopup}
        editorWrapper={editorWrapper}
        marker={marker}
        overlapToolbar
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
                error={linkTextRequiredError}
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

export default {
  name: 'create_link',
  getMarker: () => document.getElementsByClassName('nib-link-marker')[0],
  condition: ({ state }: { state: EditorState }) => {
    const pluginState = linkPluginKey.getState(state);
    return pluginState && pluginState.showAddLinkToolbar;
  },
  component: (props: any) => (
    <PMStateConsumer>
      {({ pmstate }: { pmstate: ProsemirrorEditorState }) => (
        <CreatePopup pmstate={pmstate} {...props} />
      )}
    </PMStateConsumer>
  )
};

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  padding: 4;
  ${({ theme: { constants } }: { theme: EditorStyle }) => `
    border-radius: ${constants.borderRadius};
    font-size: ${constants.fontSize.medium};
  `}
`;

const InputWrapper = styled.div({
  '> div:first-of-type': {
    marginBottom: 8
  }
});
