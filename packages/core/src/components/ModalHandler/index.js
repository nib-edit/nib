import React, { Component } from "react";

class ModalHandler extends Component {
  getVisibleModal = () => {
    const { modals } = this.props;
    for (let i = 0; i < modals.length; i++) {
      const modal = modals[i];
      const marker = document.getElementsByClassName(modal.elmClassName);
      if (marker[0]) {
        return {
          marker: marker[0],
          ModalComponent: modal.component
        };
      }
    }
  };

  render() {
    const visibleModal = this.getVisibleModal();
    if (!visibleModal) return null;
    const { view, editorWrapper } = this.props;
    const { ModalComponent, marker } = visibleModal;
    return (
      <ModalComponent
        view={view}
        editorWrapper={editorWrapper}
        marker={marker}
      />
    );
  }
}

export default ModalHandler;
