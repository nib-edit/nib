import * as React from 'react';
import {
  FunctionComponent,
  Fragment,
  MutableRefObject,
  useState,
  useRef,
} from 'react';
import styled from '@emotion/styled';

import { Popup, ToolbarButton, Icon } from 'nib-ui';

import { ConfigContextConsumer } from '../../context/config';
import { PMStateConsumer } from '../../context/pm-state';
import { colorPluginKey } from './plugin';
import { ProsemirrorEditorState } from '../../types/prosemirror';
import { EditorConfig } from '../../types/editor-config';

interface ToolbarComponentProps {
  pmstate: ProsemirrorEditorState;
  config: EditorConfig;
  editorWrapper: MutableRefObject<HTMLDivElement>;
}

const ToolbarComponent: FunctionComponent<ToolbarComponentProps> = ({
  pmstate,
  config,
  editorWrapper,
}) => {
  const [popupMarker, setPopupMarker] = useState<
    MutableRefObject<HTMLDivElement | undefined>
  >();
  const [selectedMarkType, setSelectedMarkType] = useState<string>();

  const textColorRef = useRef<HTMLDivElement>();
  const backgroundColorRef = useRef<HTMLDivElement>();

  const getActiveColorMarks = () => {
    const { pmview } = pmstate;
    const { state } = pmview;
    const pluginState = colorPluginKey.getState(state);
    return pluginState && pluginState.activeColorMarks;
  };

  const toggleColorType = (evt: Event) => {
    const color = (evt.currentTarget as HTMLElement).getAttribute('name');
    const { pmview } = pmstate;
    const { state, dispatch } = pmview;
    const { schema, selection, tr } = state;
    const { $from, $to } = selection;
    const markType = schema.marks[selectedMarkType!];
    const activeColorMarks = getActiveColorMarks();
    if (
      activeColorMarks[selectedMarkType!] &&
      activeColorMarks[selectedMarkType!].attrs.color === color
    ) {
      tr.removeMark($from.pos, $to.pos, markType).removeStoredMark(markType);
    } else {
      const colorMark = markType.create({ color });
      tr.addMark($from.pos, $to.pos, colorMark).setStoredMarks([colorMark]);
    }
    dispatch(tr);
    closeColorSelect(evt);
  };

  const openColorSelect = (evt: Event) => {
    const newSelectedMarkType = (evt.currentTarget as HTMLElement).getAttribute(
      'name'
    );
    if (!newSelectedMarkType || selectedMarkType === newSelectedMarkType) {
      setPopupMarker(undefined);
      setSelectedMarkType(undefined);
    } else {
      setPopupMarker(
        newSelectedMarkType === 'textColor' ? textColorRef : backgroundColorRef
      );
      setSelectedMarkType(newSelectedMarkType);
    }
  };

  const closeColorSelect = (evt: Event) => {
    if (textColorRef.current!.contains(evt.currentTarget as HTMLElement))
      return;
    if (backgroundColorRef.current!.contains(evt.currentTarget as HTMLElement))
      return;
    setPopupMarker(undefined);
    setSelectedMarkType(undefined);
  };

  const { pmview } = pmstate;
  if (!pmview) return null;
  const marker = popupMarker && popupMarker.current;
  const activeMarks = getActiveColorMarks();
  const selectedTextColor =
    activeMarks.textColor && activeMarks.textColor.attrs.color;
  const selectedBackgroundColor =
    activeMarks.backgroundColor && activeMarks.backgroundColor.attrs.color;
  const colors = config!.plugins!.color!.colors;

  return (
    <Fragment>
      <ToolbarButton
        forwardRef={textColorRef}
        name="textColor"
        onClick={openColorSelect}
        selected={!!activeMarks.textColor}
        title="Text Color"
      >
        <Icon
          name="textColor"
          selected={!!activeMarks.textColor}
          selectedColor={selectedTextColor}
        />
      </ToolbarButton>
      <ToolbarButton
        forwardRef={backgroundColorRef}
        name="backgroundColor"
        onClick={openColorSelect}
        selected={!!activeMarks.backgroundColor}
        title="Background Color"
      >
        <Icon
          name="backgroundColor"
          selected={!!activeMarks.backgroundColor}
          selectedColor={selectedBackgroundColor}
        />
      </ToolbarButton>
      {marker && (
        <Popup
          editorWrapper={editorWrapper}
          marker={marker}
          onClickInsideEditor={closeColorSelect}
          onClickOutsideEditor={closeColorSelect}
          onEscKeyPress={closeColorSelect}
          render={() => (
            <ColorsWrapper>
              {colors.map((color: string) => (
                <StyledButton
                  key={`${selectedMarkType}-${color}`}
                  name={color}
                  color={color}
                  onClick={toggleColorType}
                  selected={
                    (selectedMarkType === 'backgroundColor' &&
                      selectedBackgroundColor === color) ||
                    (selectedMarkType === 'textColor' &&
                      selectedTextColor === color)
                  }
                />
              ))}
            </ColorsWrapper>
          )}
        />
      )}
    </Fragment>
  );
};

const ColorsWrapper = styled.div`
  display: flex;
`;

const StyledButton = styled(ToolbarButton)`
  background-color: ${({ color }: { color: string }) => color};
  border: ${({ selected }: { selected: boolean }) =>
    selected ? '0.5px solid white' : 'none'};
  box-shadow: ${({ color, selected }: { color: string; selected: boolean }) =>
    selected ? `0px 0px 0px 0.5px ${color}` : 'none'};
  height: 24px;
  margin-right: 4px;
  margin: 2px;
  padding: 0;
  width: 24px;
`;

export default (props: any) => (
  <ConfigContextConsumer>
    {({ config }) => (
      <PMStateConsumer>
        {({ pmstate }) => (
          <ToolbarComponent pmstate={pmstate} {...props} config={config} />
        )}
      </PMStateConsumer>
    )}
  </ConfigContextConsumer>
);
