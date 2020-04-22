import * as React from 'react';
import { ElementType } from 'react';
import { EditorPopup } from '../../types/components';
import { ProsemirrorEditorState } from '../../types/prosemirror';

export interface VisiblePopup {
  marker: Element;
  name: string;
  PopupComponent: ElementType;
}

export const getVisiblePopups = (
  pmstate: ProsemirrorEditorState,
  popups: EditorPopup[],
  visiblePopups: VisiblePopup[] = []
) => {
  const { pmview } = pmstate;

  if (!pmview) return [];

  let newVisiblePopups = [...visiblePopups];
  for (let i = 0; i < popups.length; i += 1) {
    const popup = popups[i];
    let popupVisible = false;

    // If popup visibility conditions are met add it to newVisiblePopups
    if (!popup.condition || popup.condition(pmview)) {
      const marker = popup.getMarker(pmview);
      if (marker) {
        popupVisible = true;
        let toolbarIndex = newVisiblePopups.findIndex(
          (p) => p.name === popup.name
        );
        if (toolbarIndex < 0) {
          toolbarIndex = newVisiblePopups.length;
        }
        newVisiblePopups[toolbarIndex] = {
          marker,
          name: popup.name,
          PopupComponent: popup.component,
        };
      }
    }

    // If popup is no longer visible remove it from newVisiblePopups
    if (!popupVisible && visiblePopups.find((p) => p.name === popup.name)) {
      newVisiblePopups = newVisiblePopups.filter((p) => p.name !== popup.name);
    }
  }
  return newVisiblePopups;
};
