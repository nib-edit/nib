import * as React from 'react';
import { FunctionComponent, MutableRefObject } from 'react';
import { withTheme } from 'emotion-theming';

import { EditorTheme } from '../../types/editor-theme';
import { Addon } from '../../types/addon';
import { usePMStateContext } from '../../context/pm-state/index';

interface PopupHandlerProps {
  plugins: Addon[];
  theme: EditorTheme;
  editorWrapper: MutableRefObject<HTMLDivElement | null>;
}

const ToolbarHandler: FunctionComponent<PopupHandlerProps> = ({
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
