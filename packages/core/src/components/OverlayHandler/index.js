import React, {Component} from "react";

class OverlayHandler extends Component {
  getVisibleOverlay = () => {
    const {overlays} = this.props;
    for (let i = 0; i < overlays.length; i++) {
      const overlay = overlays[i];
      const marker = document.getElementsByClassName(overlay.elmClassName);
      if (marker[0]) {
        return {
          marker: marker[0],
          OverlayComponent: overlay.component
        };
      }
    }
  };

  render() {
    const visibleOverlay = this.getVisibleOverlay();
    if (!visibleOverlay) return null;
    const {view, editorWrapper} = this.props;
    const {OverlayComponent, marker} = visibleOverlay;
    return (
      <OverlayComponent
        view={view}
        editorWrapper={editorWrapper}
        marker={marker}
      />
    );
  }
}

export default OverlayHandler;
