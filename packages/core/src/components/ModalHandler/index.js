import React, {Component} from "react";

class ModalHandler extends Component {
  getVisibleModal = () => {
    const {modals, view} = this.props;
    for (let i = 0; i < modals.length; i++) {
      const modal = modals[i];
      if (modal.condition(view.state)) {
        return modal.component;
      }
    }
  };

  render() {
    const {view} = this.props;
    if (!view) return null;
    const VisibleModal = this.getVisibleModal();
    if (!VisibleModal) return null;
    return <VisibleModal view={view} />;
  }
}

export default ModalHandler;
