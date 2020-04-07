import * as React from 'react';
import { MutableRefObject, PureComponent } from 'react';

import { IVisiblePopup, getVisiblePopups } from './util';

import getPropertyFromPlugins from '../../utils/editor/pluginProperty';
import inlineToolbar from '../Toolbar/Inline';
import { ConfigContextConsumer } from '../../context/config';
import { PMStateConsumer } from '../../context/pm-state';
import { IEditorConfig } from '../../types/editor-config';
import { IAddon } from '../../types/addon';
import { IProsemirrorEditorState } from '../../types/prosemirror';
import { IEditorPopup } from '../../types/components';

interface IPopupHandler {
  config: IEditorConfig;
  addons?: IAddon[];
  pmstate: IProsemirrorEditorState;
  editorWrapper: MutableRefObject<HTMLDivElement | null>;
}

class PopupHandler extends PureComponent<IPopupHandler> {
  popups: IEditorPopup[] = [];
  visiblePopups: IVisiblePopup[] = [];

  componentDidMount() {
    const { config, addons = [] } = this.props;
    const { plugins, toolbar } = config;
    this.popups = getPropertyFromPlugins(plugins!.options!, 'popups');
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
        {tablePopups.map((popup: IVisiblePopup) => {
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

interface IPopupWrapper {
  addons?: IAddon[];
  editorWrapper: MutableRefObject<HTMLDivElement | null>;
}

export default (props: IPopupWrapper) => (
  <ConfigContextConsumer>
    {({ config }: { config: IEditorConfig }) => (
      <PMStateConsumer>
        {({ pmstate }: { pmstate: IProsemirrorEditorState }) => (
          <PopupHandler config={config} pmstate={pmstate} {...props} />
        )}
      </PMStateConsumer>
    )}
  </ConfigContextConsumer>
);
