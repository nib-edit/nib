import PropTypes from "prop-types";
import React, { PureComponent } from "react";

import getPropertyFromPlugins from "../../utils/editor/pluginProperty";
import inlineToolbar from "../Toolbar/Inline";
import { ConfigContextConsumer } from "../../context/config";
import { PMStateConsumer } from "../../context/pm-state";

const getVisiblePopups = (pmstate, popups, visiblePopups) => {
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
          p => p.name === popup.name
        );
        if (toolbarIndex < 0) {
          toolbarIndex = newVisiblePopups.length;
        }
        newVisiblePopups[toolbarIndex] = {
          marker,
          name: popup.name,
          PopupComponent: popup.component
        };
      }
    }

    // If popup is no longer visible remove it from newVisiblePopups
    if (!popupVisible && visiblePopups.find(p => p.name === popup.name)) {
      newVisiblePopups = newVisiblePopups.filter(p => p.name !== popup.name);
    }
  }
  return newVisiblePopups;
};

class PopupHandler extends PureComponent {
  componentDidMount() {
    const { config } = this.props;
    const { plugins, toolbar } = config;
    this.popups = getPropertyFromPlugins(plugins.options, "popups");
    if (toolbar.options.indexOf("inline") >= 0) this.popups.push(inlineToolbar);
    this.visiblePopup = [];
  }

  render() {
    const { pmstate, editorWrapper } = this.props;

    this.visiblePopups = getVisiblePopups(
      pmstate,
      this.popups,
      this.visiblePopups
    );

    if (!this.visiblePopups.length) return null;
    const { PopupComponent, marker } = this.visiblePopups[
      this.visiblePopups.length - 1
    ];

    const tablePopups = this.visiblePopups.filter(
      popup => popup.name === "table_menu" || popup.name === "cell_menu"
    );

    // todo: refactor table popups for a better implementation

    return (
      <>
        <PopupComponent
          pmstate={pmstate}
          editorWrapper={editorWrapper}
          marker={marker}
        />
        {tablePopups.map(popup => {
          const {
            PopupComponent: TablePopupComponent,
            marker: tableMarker
          } = popup;
          return (
            <TablePopupComponent
              key={`popup_${popup.name}`}
              pmstate={pmstate}
              editorWrapper={editorWrapper}
              marker={tableMarker}
            />
          );
        })}
      </>
    );
  }
}

PopupHandler.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  editorWrapper: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  config: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pmstate: PropTypes.object.isRequired
};

export default props => (
  <ConfigContextConsumer>
    {({ config }) => (
      <PMStateConsumer>
        {pmstate => (
          <PopupHandler config={config} pmstate={pmstate} {...props} />
        )}
      </PMStateConsumer>
    )}
  </ConfigContextConsumer>
);
