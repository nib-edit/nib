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
    const popupVisibleBefore = newVisiblePopups.find(
      p => p.name === popup.name
    );
    let popupVisible = false;

    // If popup visibility conditions are met add it to newVisiblePopups
    if (!popup.condition || popup.condition(pmview.state)) {
      const marker = document.getElementsByClassName(popup.elmClassName);
      if (marker[0]) {
        popupVisible = true;
        if (!popupVisibleBefore)
          newVisiblePopups[newVisiblePopups.length] = {
            marker: marker[0],
            name: popup.name,
            PopupComponent: popup.component
          };
      }
    }

    // If popup is no longer visible remove it from newVisiblePopups
    if (!popupVisible && popupVisibleBefore) {
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

    return <PopupComponent editorWrapper={editorWrapper} marker={marker} />;
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
