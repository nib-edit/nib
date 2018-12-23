export const buildMenu = plugins =>
  plugins.reduce(
    (result, plugin) => [...result, ...(plugin ? plugin.menus : [])],
    []
  );
