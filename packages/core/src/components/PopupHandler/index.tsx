import * as React from 'react';
import { MutableRefObject, PureComponent } from 'react';

import { VisiblePopup, getVisiblePopups } from './util';

import getPropertyFromPlugins from '../../utils/editor/pluginProperty';
import inlineToolbar from '../Toolbar/Inline';
import { ConfigContextConsumer } from '../../context/config';
import { PMStateConsumer } from '../../context/pm-state';
import { EditorConfig } from '../../types/editor-config';
import { Addon } from '../../types/addon';
import { ProsemirrorEditorState } from '../../types/prosemirror';
import { EditorPopup } from '../../types/components';

interface PopupHandlerProps {
  config: EditorConfig;
  addons?: Addon[];
  pmstate: ProsemirrorEditorState;
  editorWrapper: MutableRefObject<HTMLDivElement | null>;
}

class PopupHandler extends PureComponent<PopupHandlerProps> {
  popups: EditorPopup[] = [];
  visiblePopups: VisiblePopup[] = [];

  componentDidMount() {
    const { config, addons = [] } = this.props;
    const { plugins, toolbar } = config;
    this.popups = getPropertyFromPlugins(
      plugins!.options!,
      'popups'
    ) as EditorPopup[];
    addons.forEach((addon) => {
      if (addon.popups) {
        this.popups = [...this.popups, ...addon.popups];
      }
    });
    if (toolbar!.options!.indexOf('inline') >= 0)
      this.popups.push(inlineToolbar);
    this.visiblePopups = [];
  }

  render() {
    const { pmstate, editorWrapper } = this.props;
    if (!pmstate) return null;

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
      (popup) => popup.name === 'table_menu' || popup.name === 'cell_menu'
    );

    // todo: refactor table popups for a better implementation

    return (
      <>
        <PopupComponent
          pmstate={pmstate}
          editorWrapper={editorWrapper}
          marker={marker}
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
            />
          );
        })}
      </>
    );
  }
}

interface PopupWrapperProps {
  addons?: Addon[];
  editorWrapper: MutableRefObject<HTMLDivElement | null>;
}

export default (props: PopupWrapperProps) => (
  <ConfigContextConsumer>
    {({ config }: { config: EditorConfig }) => (
      <PMStateConsumer>
        {({ pmstate }: { pmstate: ProsemirrorEditorState }) => (
          <PopupHandler config={config} pmstate={pmstate} {...props} />
        )}
      </PMStateConsumer>
    )}
  </ConfigContextConsumer>
);
