import * as React from 'react';
import { MutableRefObject, PureComponent, ChangeEvent } from 'react';
import styled from '@emotion/styled';
import { TextSelection } from 'prosemirror-state';

import { PrimaryButton, Input, Popup, Space, SpaceSize } from 'nib-ui';

import { PMStateConsumer } from '../../../context/pm-state';
import { EditorStyle } from '../../../types/editor-style';
import { ProsemirrorEditorState } from '../../../types/prosemirror';
import { linkPluginKey } from '../plugin';

interface EditPopupProps {
  pmstate: ProsemirrorEditorState;
  editorWrapper: MutableRefObject<HTMLDivElement | null>;
  marker: Element;
}

interface EditPopupState {
  href?: string;
}

class EditPopup extends PureComponent<EditPopupProps, EditPopupState> {
  constructor(props: EditPopupProps) {
    super(props);
    const link = this.getLink();
    this.state = {
      href: link.href
    };
  }

  updateHref = (evt: ChangeEvent) => {
    this.setState({
      href: (evt.target as HTMLInputElement).value
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
    dispatch(state.tr.setMeta('show-edit-link-toolbar', false));
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

export default {
  name: 'edit_link',
  getMarker: () => document.getElementsByClassName('nib-edit-link-marker')[0],
  component: (props: any) => (
    <PMStateConsumer>
      {({ pmstate }: { pmstate: ProsemirrorEditorState }) => (
        <EditPopup pmstate={pmstate} {...props} />
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

// todo: in-case of inline toolbars edit link options should be merged with the toolbar.
