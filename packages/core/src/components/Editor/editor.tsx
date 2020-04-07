import * as React from 'react';
import { FunctionComponent, useEffect, useState, useRef } from 'react';
import { EditorView } from 'prosemirror-view';
import { Transaction } from 'prosemirror-state';

import getPluginStyles from '../../utils/editor/styles';
import { buildEditorState, updateEditorState } from '../../utils/editor/state';
import { getPluginList } from '../../utils/editor/plugins';
import { useConfigContext } from '../../context/config';
import { IProsemirrorDoc } from '../../types/prosemirror';
import { IAddon } from '../../types/addon';

import { StyledEditor } from './styles';

interface IEditor {
  addons?: IAddon[];
  autoFocus?: boolean;
  defaultValue?: IProsemirrorDoc;
  licenseKey?: string;
  onChange?: (doc: IProsemirrorDoc) => void;
  spellCheck?: boolean;
}

const Editor: FunctionComponent<IEditor> = ({
  addons = [],
  autoFocus = false,
  defaultValue,
  licenseKey,
  onChange = () => {},
  spellCheck = false,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const {
    config: { plugins },
    dispatcher,
  } = useConfigContext();
  let [view] = useState<EditorView>();
  const viewProvider = () => view;

  const updateViewListeners = () => {
    dispatcher.dispatch(view);
    addons.forEach((addon: IAddon) => {
      if (addon.viewUpdateCallback) addon.viewUpdateCallback(view);
    });
  };

  useEffect(() => {
    const pluginList = getPluginList(
      `${plugins.options} history common`
    ).concat(addons);
    const state = buildEditorState(pluginList, defaultValue, viewProvider);
    view = new EditorView(editorRef.current!, {
      state,
      dispatchTransaction: (tr: Transaction) => {
        let editorState = view!.state.apply(tr);

        addons.forEach((addon: IAddon) => {
          if (addon.dispatchTransactionCallback)
            editorState = addon.dispatchTransactionCallback(editorState, tr);
        });

        updateEditorState(view!, editorState);
        updateViewListeners();
        const serializableState = view!.state.toJSON();
        addons.forEach((addon: IAddon) => {
          const { name, getSerializableState } = addon;
          if (getSerializableState)
            serializableState[name] = getSerializableState();
        });
        if (onChange) onChange(serializableState);
      },
    });
    if (autoFocus) {
      view.focus();
    }
    addons.forEach((addon: IAddon) => {
      if (addon.createStateFromDoc)
        addon.createStateFromDoc((doc: IProsemirrorDoc) => {
          const editorState = buildEditorState(pluginList, doc);
          view!.updateState(editorState);
        });
    });
    updateViewListeners();
    addons.forEach((addon: IAddon) => {
      if (addon.updateLicenseInfo)
        addon.updateLicenseInfo(editorRef.current, licenseKey);
      if (defaultValue && defaultValue[addon.name] && addon.init)
        addon.init(defaultValue[addon.name]);
    });
    return () => view!.destroy();
  }, []);

  return (
    <StyledEditor
      // eslint-disable-next-line react/prop-types
      pluginStyles={getPluginStyles(plugins.options, addons)}
      ref={editorRef}
      spellCheck={spellCheck}
    />
  );
};

export default Editor;
