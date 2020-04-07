import * as React from 'react';
import { FunctionComponent, MutableRefObject } from 'react';
import { withTheme } from 'emotion-theming';

import { usePMStateContext } from '../../context/pm-state';
import { IEditorTheme } from '../../types/editor-theme';
import { IAddon } from '../../types/addon';

interface IPopupHandler {
  plugins: IAddon[];
  theme: IEditorTheme;
  editorWrapper: MutableRefObject<HTMLDivElement | null>;
}

const ToolbarHandler: FunctionComponent<IPopupHandler> = ({
  editorWrapper,
  plugins,
  theme,
}) => {
  const { pmstate } = usePMStateContext();
  return (
    <>
      {plugins.map(
        (plugin) =>
          plugin.toolbar &&
          plugin.toolbar.map((Toolbar, index) => (
            <Toolbar
              // eslint-disable-next-line react/no-array-index-key
              key={`plugin-toolbar-${plugin.name}-${index}`}
              editorWrapper={editorWrapper}
              pmstate={pmstate}
              theme={theme}
            />
          ))
      )}
    </>
  );
};

export default withTheme(ToolbarHandler);
