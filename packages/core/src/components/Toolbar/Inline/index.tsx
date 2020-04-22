import * as React from 'react';
import {
  FunctionComponent,
  Fragment,
  MouseEvent,
  MutableRefObject,
  useEffect,
  useState,
} from 'react';
import styled from '@emotion/styled';
import { Popup, Separator } from 'nib-ui';

import getToolbarComponents from '../../../utils/editor/toolbar';
import { useConfigContext } from '../../../context/config';
import { usePMStateContext } from '../../../context/pm-state';
import { EditorStyle } from '../../../types/editor-style';
import { EditorPlugin } from '../../../types/application';

interface InlineProps {
  editorWrapper: MutableRefObject<HTMLDivElement>;
  marker: Element;
}

const Inline: FunctionComponent<InlineProps> = ({ editorWrapper, marker }) => {
  if (!marker) return null;

  const [changeCounter, setChangeCounter] = useState(0);

  const {
    config: { plugins, toolbar },
  } = useConfigContext();
  const { pmstate } = usePMStateContext();
  if (!pmstate) return null;
  const options = getToolbarComponents(plugins.options, toolbar.inline.options);

  const closePopup = () => {
    const { state, dispatch } = pmstate.pmview;
    // todo: here use a specific transaction for inline toolbar
    dispatch(state.tr.setMeta('hide-all-popups', true));
  };

  useEffect(() => {
    setChangeCounter(changeCounter + 1);
  }, [pmstate]);

  return (
    <StyledPopup
      onEscKeyPress={closePopup}
      onClickOutsideEditor={closePopup}
      editorWrapper={editorWrapper}
      marker={marker}
      changeCounter={changeCounter}
      render={() => (
        <Wrapper onMouseDown={(e: MouseEvent) => e.preventDefault()}>
          {options.map((Option: EditorPlugin, index: number) => {
            if (!Option.toolbarComponent) return null;
            return (
              <Fragment key={`inline-toolbar-option-${Option.name}`}>
                <Option.toolbarComponent
                  config={toolbar.inline[Option.name]}
                  pmstate={pmstate}
                />
                {index < options.length - 1 && <Separator />}
              </Fragment>
            );
          })}
        </Wrapper>
      )}
    />
  );
};

const Wrapper = styled.div(
  {
    alignItems: 'center',
    display: 'flex',
    position: 'relative',
    border: 'none',
    userSelect: 'none',
  },
  ({ theme: { constants, toolbar } }: { theme: EditorStyle }) => ({
    backgroundColor: constants.color.background.primary,
    color: constants.color.text.primary,
    fontSize: constants.fontSize.medium,
    borderRadius: constants.borderRadius.large,

    ...toolbar.inline({ theme: constants }),
  })
);

const StyledPopup = styled(Popup)({ padding: '2px !important' });

export default {
  name: 'toolbar',
  getMarker: () =>
    document.getElementsByClassName('nib-selection-focus-marker')[0],
  component: Inline,
};
