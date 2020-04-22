import * as React from 'react';
import {
  ChangeEvent,
  FunctionComponent,
  MutableRefObject,
  useState,
} from 'react';
import styled from '@emotion/styled';
import { EditorState } from 'prosemirror-state';

import { PrimaryButton, Input, Popup } from 'nib-ui';

import { EditorStyle } from '../../../types/editor-style';
import { usePMStateContext } from '../../../context/pm-state/index';
import { linkPluginKey } from '../plugin';

interface CreatePopupProps {
  editorWrapper: MutableRefObject<HTMLDivElement | null>;
  marker: Element;
}

const CreatePopup: FunctionComponent<CreatePopupProps> = ({
  editorWrapper,
  marker,
}) => {
  const { pmstate } = usePMStateContext();
  if (!pmstate) return null;
  const { pmview } = pmstate;
  if (!pmview) return null;

  const getSelectedText = () => {
    const { state } = pmview;
    const { selection } = state;
    const { $from, $to } = selection;
    return state.doc.textBetween($from.pos, $to.pos);
  };

  const [linkText, setLinkText] = useState(getSelectedText());
  const [href, setHref] = useState('');
  const [linkTextRequiredError, setLinkTextRequiredError] = useState(false);

  const updateLinkText = (evt: ChangeEvent) => {
    const { name, value } = evt.target as HTMLInputElement;
    setLinkText(value);
    if (value) {
      setLinkTextRequiredError(false);
    }
  };

  const addLink = () => {
    if (!linkText || !linkText.length) {
      setLinkTextRequiredError(true);
      return;
    }
    setLinkTextRequiredError(false);
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
    closePopup();
  };

  const handleKeyDown = (evt: KeyboardEvent) => {
    if (evt.key === 'Enter') {
      addLink();
    }
  };

  const closePopup = () => {
    const { state, dispatch } = pmview;
    dispatch(state.tr.setMeta('show-add-link-toolbar', false));
  };

  return (
    <Popup
      onEscKeyPress={closePopup}
      onClickOutsideEditor={closePopup}
      onClickInsideEditor={closePopup}
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
              onChange={updateLinkText}
              onKeyPress={handleKeyDown}
              value={linkText}
              error={linkTextRequiredError}
            />
            <Input
              placeholder="Href"
              name="href"
              onChange={(evt: ChangeEvent) =>
                setHref((evt.target as HTMLInputElement).value)
              }
              onKeyPress={handleKeyDown}
              value={href}
            />
          </InputWrapper>
          <PrimaryButton onKeyPress={handleKeyDown} onClick={addLink}>
            Add
          </PrimaryButton>
          <PrimaryButton onClick={closePopup}>Cancel</PrimaryButton>
        </Wrapper>
      )}
    />
  );
};

export default {
  name: 'create_link',
  getMarker: () => document.getElementsByClassName('nib-link-marker')[0],
  condition: ({ state }: { state: EditorState }) => {
    const pluginState = linkPluginKey.getState(state);
    return pluginState && pluginState.showAddLinkToolbar;
  },
  component: CreatePopup,
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
    marginBottom: 8,
  },
});
