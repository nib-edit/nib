import * as React from 'react';
import { useState } from 'react';
import styled from '@emotion/styled';

import { Modal, Input, PrimaryButton, Space, SpaceSize } from 'nib-ui';

import { usePMStateContext } from '../../context/pm-state/index';
import { EditorStyle } from '../../types/editor-style';

interface ImageModalProps {
  hideModal: () => void;
}

export default (props: ImageModalProps) => {
  const { pmstate } = usePMStateContext();
  if (!pmstate) return null;

  const [imageSrc, setImageSrc] = useState('');
  const [srcRequiredError, setSrcRequiredError] = useState(false);

  const insertImageInEditor = () => {
    if (!imageSrc) {
      setSrcRequiredError(true);
      return;
    }
    const { hideModal } = props;
    const { pmview } = pmstate;
    const { state, dispatch } = pmview;
    const { $from, $to } = state.selection;
    const { image } = state.schema.nodes;
    dispatch(
      state.tr.replaceRangeWith(
        $from.pos,
        $to.pos,
        image.create({ src: imageSrc })
      )
    );
    hideModal();
    pmview.focus();
  };

  const updateImageSrc = (src: string) => {
    setImageSrc(src);
    setSrcRequiredError(srcRequiredError && !src);
  };

  const { hideModal } = props;
  return (
    <Modal
      hideModal={hideModal}
      title="Image"
      render={() => (
        <Wrapper>
          <SubTitle>Enter url or upload</SubTitle>
          <InnerWrapper>
            <StyledInput
              placeholder="Url"
              autoFocus
              value={imageSrc}
              onChange={(evt: React.ChangeEvent) =>
                updateImageSrc((evt.target as HTMLInputElement).value)
              }
              error={srcRequiredError}
            />
            <ImageWrapper src={imageSrc}>
              {imageSrc && <StyledImage src={imageSrc} alt="uploaded_image" />}
            </ImageWrapper>
            <ButtonSection>
              <PrimaryButton onClick={insertImageInEditor}>
                Insert
              </PrimaryButton>
              <Space size={SpaceSize.xl} />
              <PrimaryButton onClick={hideModal}>Cancel</PrimaryButton>
            </ButtonSection>
          </InnerWrapper>
        </Wrapper>
      )}
    />
  );
};

const Wrapper = styled.div({}, () => ({
  padding: '0px 24px 10px',
  height: '100%'
}));

const InnerWrapper = styled.div({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  height: '95%'
});

const SubTitle = styled.div(
  {},
  ({ theme: { constants } }: { theme: EditorStyle }) => ({
    fontSize: constants.fontSize.large
  })
);

const ImageWrapper = styled.span(
  {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    position: 'relative',

    height: '55%',
    width: '35%',
    minWidth: 200,
    margin: '28px auto 0 auto',
    padding: 20,

    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain'
  },
  ({ theme, src }: { theme: EditorStyle; src: string }) => ({
    border: src
      ? `1px dashed ${theme.constants.color.highlight.primary}`
      : `1px dashed ${theme.constants.color.border.primary}`
  })
);

const StyledInput = styled(Input)({}, () => ({
  width: '75%',
  maxWidth: 400,
  '> input': { width: '100%', margin: '0 auto' }
}));

const ButtonSection = styled.div({ display: 'flex', marginTop: 20 });

const StyledImage = styled.img({
  height: 'auto',
  width: 'auto',
  maxHeight: '100%',
  maxWidth: '100%'
});
