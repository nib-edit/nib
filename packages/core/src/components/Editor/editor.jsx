import PropTypes from "prop-types";
import React, { useEffect, useState, useRef } from "react";
import { EditorView } from "prosemirror-view";

import getPluginStyles from "../../utils/editor/styles";
import { buildEditorState, updateEditorState } from "../../utils/editor/state";
import { getPluginList } from "../../utils/editor/plugins";
import { useConfigContext } from "../../context/config";
import { usePMStateContext } from "../../context/pm-state";

import { StyledEditor } from "./styles";

const Editor = ({ defaultValue, autoFocus, spellCheck, addons, onChange }) => {
  const editorRef = useRef(null);
  const {
    config: { plugins },
    dispatcher
  } = useConfigContext();
  const pmstate = usePMStateContext();
  let [view] = useState();

  const updateViewListeners = () => {
    dispatcher.dispatch(view);
    addons.forEach(addon => {
      addon.viewUpdateCallback(view);
    });
  };

  useEffect(() => {
    const state = buildEditorState(
      getPluginList(`${plugins.options} history common`).concat(addons),
      defaultValue
    );
    view = new EditorView(editorRef.current, {
      state,
      dispatchTransaction: tr => {
        updateEditorState(view, tr);
        updateViewListeners();
        if (onChange) onChange(view.state.toJSON());
      }
    });
    if (autoFocus) {
      view.focus();
    }
    updateViewListeners();
    return () => view.destroy();
  }, []);

  return (
    <StyledEditor
      // eslint-disable-next-line react/prop-types
      onClick={() => pmstate.pmview.focus()}
      pluginStyles={getPluginStyles(plugins.options)}
      ref={editorRef}
      spellCheck={spellCheck}
    />
  );
};

Editor.propTypes = {
  autoFocus: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  defaultValue: PropTypes.object,
  onChange: PropTypes.func,
  spellCheck: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  addons: PropTypes.array
};

Editor.defaultProps = {
  autoFocus: false,
  defaultValue: undefined,
  onChange: () => {},
  spellCheck: false,
  addons: []
};

export default Editor;
