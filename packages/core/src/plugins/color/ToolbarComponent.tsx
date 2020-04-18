import * as React from 'react';
import { Fragment, MutableRefObject, useState, useRef } from 'react';
import styled from '@emotion/styled';

import { Popup, ToolbarButton, Icon } from 'nib-ui';

import { colorPluginKey } from './plugin';
import { useConfigContext } from '../../context/config/index';
import { usePMStateContext } from '../../context/pm-state/index';

export interface ToolbarComponentProps {
  editorWrapper: MutableRefObject<HTMLDivElement>;
}

export default ({ editorWrapper }: ToolbarComponentProps) => {
  const [popupMarker, setPopupMarker] = useState<
    MutableRefObject<HTMLDivElement | undefined>
  >();
  const [selectedMarkType, setSelectedMarkType] = useState<string>();

  const textColorRef = useRef<HTMLDivElement>();
  const backgroundColorRef = useRef<HTMLDivElement>();

  const { config } = useConfigContext();
  const { pmstate } = usePMStateContext();
  if (!pmstate) return null;

  const { pmview } = pmstate;
  if (!pmview) return null;

  const getActiveColorMarks = () => {
    const { state } = pmview;
    const pluginState = colorPluginKey.getState(state);
    return pluginState && pluginState.activeColorMarks;
  };

  const toggleColorType = (evt: Event) => {
    const color = (evt.currentTarget as HTMLElement).getAttribute('name');
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

const StyledButton = styled(ToolbarButton)<{
  color: string;
  selected: boolean;
}>`
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
