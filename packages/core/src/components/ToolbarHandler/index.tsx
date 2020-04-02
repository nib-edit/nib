import * as React from 'react';
import { MutableRefObject } from 'react';
import { withTheme } from 'emotion-theming';

import { usePMStateContext } from '../../context/pm-state';
import { ThemeType } from '../../types/editor-theme';
import { Addon } from '../../types/addon';

interface PopupHandlerProps {
  plugins: Addon[];
  theme: ThemeType;
  editorWrapper: MutableRefObject<HTMLDivElement | null>;
}

const ToolbarHandler = ({
  editorWrapper,
  plugins,
  theme,
}: PopupHandlerProps) => {
  const pmstate = usePMStateContext();
  return (
    <>
      {plugins.map(
        plugin =>
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
