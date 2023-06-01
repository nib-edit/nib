import * as React from "react";
import { MutableRefObject, useEffect, useState } from "react";
import { withTheme } from "@emotion/react";

import getPropertyFromPlugins from "../../utils/editor/pluginProperty";
import { Addon } from "../../types/addon";
import { EditorPopup } from "../../types/components";
import { EditorTheme } from "../../types/editor-theme";
import { VisiblePopup, getVisiblePopups } from "./util";
import { useConfigContext } from "../../context/config/index";
import { usePMStateContext } from "../../context/pm-state/index";

import inlineToolbar from "../Toolbar/Inline";

interface PopupHandlerProps {
  addons?: Addon[];
  editorWrapper: MutableRefObject<HTMLDivElement | null>;
  theme: EditorTheme;
}

const PopupHandler = ({
  addons = [],
  editorWrapper,
  theme,
}: PopupHandlerProps) => {
  const { pmstate } = usePMStateContext();
  if (!pmstate) return null;
  const { pmview } = pmstate;
  if (!pmview) return null;

  const { config } = useConfigContext();

  const popups = (() => {
    const { plugins, toolbar } = config;
    let newPopups = getPropertyFromPlugins(
      plugins!.options!,
      "popups"
    ) as EditorPopup[];
    addons.forEach((addon) => {
      if (addon.popups) {
        newPopups = [...newPopups, ...addon.popups];
      }
    });
    if (toolbar!.options!.indexOf("inline") >= 0) newPopups.push(inlineToolbar);
    return newPopups;
  })();

  const [visiblePopups, setVisiblePopups] = useState<VisiblePopup[]>(
    getVisiblePopups(pmstate, popups, editorWrapper, [])
  );

  useEffect(() => {
    setVisiblePopups(
      getVisiblePopups(pmstate, popups, editorWrapper, visiblePopups || [])
    );
  }, [pmstate]);

  if (!visiblePopups.length) return null;

  const { PopupComponent, marker } = visiblePopups[visiblePopups.length - 1];

  const tablePopups = visiblePopups.filter(
    (popup) => popup.name === "table_menu" || popup.name === "cell_menu"
  );

  // todo: refactor table popups for a better implementation

  return (
    <>
      <PopupComponent
        pmstate={pmstate}
        editorWrapper={editorWrapper}
        marker={marker}
        theme={theme}
      />
      {tablePopups.map((popup: VisiblePopup) => {
        const {
          PopupComponent: TablePopupComponent,
          marker: tableMarker,
        } = popup;
        return (
          <TablePopupComponent
            key={`popup_${popup.name}`}
            pmstate={pmstate}
            editorWrapper={editorWrapper}
            marker={tableMarker}
            theme={theme}
          />
        );
      })}
    </>
  );
};

export default withTheme(PopupHandler);
