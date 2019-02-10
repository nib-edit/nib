import React, { Component } from "react";

class OverlayHandler extends Component {
  getVisibleOverlay = () => {
    const { overlays, view } = this.props;
    for (let i = 0; i < overlays.length; i++) {
      const overlay = overlays[i];
      if (overlay.condition(view.state)) {
        return overlay.component;
      }
    }
  };

  render() {
    const { view } = this.props;
    if (!view) return null;
    const VisibleOverlay = this.getVisibleOverlay();
    if (!VisibleOverlay) return null;
    return <VisibleOverlay view={view} />;
  }
}

export default OverlayHandler;
