import Plugins from "../../plugins";

export const getPluginStyles = plugins => {
  const pluginStyles = plugins
    .trim()
    .split(" ")
    .map(p => p && Plugins[p].style)
    .reduce((styleArray, style) => {
      if (style) styleArray.push(style);
      return styleArray;
    }, []);
  return theme => {
    return pluginStyles.reduce((styleStr, styleFn) => {
      styleStr += styleFn(theme);
      return styleStr;
    }, "");
  };
};
