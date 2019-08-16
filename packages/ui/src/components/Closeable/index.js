import PropTypes from "prop-types";
import React, { Component } from "react";

const Closeable = WrappedComponent => {
  class CloseableHOC extends Component {
    wrapperRef = React.createRef();

    componentDidMount() {
      window.addEventListener("keydown", this.handleKeyPress);
      window.addEventListener("mousedown", this.handleMouseDown);
    }

    componentWillUnmount = () => {
      window.removeEventListener("keydown", this.handleKeyPress);
      window.removeEventListener("mousedown", this.handleMouseDown);
    };

    handleKeyPress = evt => {
      const { onEscKeyPress } = this.props;
      if (evt.key === "Escape") onEscKeyPress();
    };

    handleMouseDown = evt => {
      const {
        onClickOutsideEditor,
        onClickInsideEditor,
        editorWrapper
      } = this.props;
      if (evt.button === 0) {
        if (
          editorWrapper &&
          editorWrapper.current &&
          !editorWrapper.current.contains(evt.target) &&
          onClickOutsideEditor
        )
          onClickOutsideEditor();
        else if (
          this.wrapperRef &&
          this.wrapperRef.current &&
          !this.wrapperRef.current.contains(evt.target) &&
          onClickInsideEditor
        )
          onClickInsideEditor();
      }
    };

    render() {
      return <WrappedComponent wrapperRef={this.wrapperRef} {...this.props} />;
    }
  }

  CloseableHOC.propTypes = {
    children: PropTypes.element,
    onEscKeyPress: PropTypes.func.isRequired,
    onClickOutsideEditor: PropTypes.func,
    onClickInsideEditor: PropTypes.func,
    editorWrapper: PropTypes.shape({
      current: PropTypes.object
    }).isRequired
  };

  CloseableHOC.defaultProps = {
    children: undefined,
    onClickOutsideEditor: undefined,
    onClickInsideEditor: undefined
  };

  return CloseableHOC;
};

export default Closeable;
