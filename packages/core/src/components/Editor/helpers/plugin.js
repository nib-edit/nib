export const buildPlugins = plugins => {
  return plugins
    .map(p => p && p.plugins)
    .reduce((result, pList) => [...result, ...(pList || [])], []);
};
