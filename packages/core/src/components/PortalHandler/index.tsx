import * as React from 'react';
import { withTheme } from 'emotion-theming';

import { Addon } from '../../types/addon';
import { EditorTheme } from '../../types/editor-theme';
import { usePMStateContext } from '../../context/pm-state/index';

interface PortalHandlerProps {
  addons?: Addon[];
  theme: EditorTheme;
}

const PortalHandler = ({ addons = [], theme }: PortalHandlerProps) => {
  const { pmstate } = usePMStateContext();
  if (!pmstate) return null;
  const { pmview } = pmstate;
  if (!pmview) return null;

  const portals = addons
    ? addons.reduce(
        (portalList, addon) => [...portalList, ...(addon.portals || [])],
        []
      )
    : [];

  return (
    <>
      {portals.map((Portal: any) => (
        <Portal theme={theme} pmstate={pmstate} />
      ))}
    </>
  );
};

export default withTheme(PortalHandler);
