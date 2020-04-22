import * as React from 'react';
import {
  ChangeEvent,
  FunctionComponent,
  MutableRefObject,
  useState,
} from 'react';
import styled from '@emotion/styled';
import { TextSelection } from 'prosemirror-state';

import { PrimaryButton, Input, Popup, Space, SpaceSize } from 'nib-ui';

import { EditorStyle } from '../../../types/editor-style';
import { usePMStateContext } from '../../../context/pm-state/index';
import { linkPluginKey } from '../plugin';

interface EditPopupProps {
  editorWrapper: MutableRefObject<HTMLDivElement | null>;
  marker: Element;
}

const EditPopup: FunctionComponent<EditPopupProps> = ({
  editorWrapper,
  marker,
}) => {
  const { pmstate } = usePMStateContext();
  if (!pmstate) return null;
  const { pmview } = pmstate;
  if (!pmview) return null;

  const getLink = () => {
    const { state } = pmview;
    const pluginState = linkPluginKey.getState(state);
    return pluginState && pluginState.link;
  };

  const link = getLink();
  if (!link) return null;

  const [href, setHref] = useState(getLink().href);

  const updateLink = () => {
    const link = getLink();
    const { state, dispatch } = pmview;
    dispatch(
      state.tr
        .setSelection(TextSelection.create(state.tr.doc, link.to))
        .removeMark(link.from, link.to, state.schema.marks.link)
        .addMark(link.from, link.to, state.schema.marks.link.create({ href }))
    );
    closePopup();
    pmview.focus();
  };

  const unLink = () => {
    const link = getLink();
    const { state, dispatch } = pmview;
    dispatch(state.tr.removeMark(link.from, link.to, state.schema.marks.link));
    pmview.focus();
    closePopup();
  };

  const closePopup = () => {
    const { state, dispatch } = pmview;
    dispatch(state.tr.setMeta('show-edit-link-toolbar', false));
  };

  return (
    <Popup
      onEscKeyPress={closePopup}
      onClickOutsideEditor={closePopup}
      editorWrapper={editorWrapper}
      marker={marker}
      render={() => (
        <Wrapper>
          <Input
            placeholder="Url"
            name="href"
            onChange={(evt: ChangeEvent) =>
              setHref((evt.target as HTMLInputElement).value)
            }
            defaultValue={link.href}
          />
          <PrimaryButton onClick={updateLink}>Update</PrimaryButton>
          <Space size={SpaceSize.l} />
          <PrimaryButton onClick={unLink}>Unlink</PrimaryButton>
        </Wrapper>
      )}
    />
  );
};

export default {
  name: 'edit_link',
  getMarker: () => document.getElementsByClassName('nib-edit-link-marker')[0],
  component: EditPopup,
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
