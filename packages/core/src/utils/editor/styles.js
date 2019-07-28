import Plugins from "../../plugins";

export default plugins => {
  const pluginStyles = plugins
    .trim()
    .split(" ")
    .map(p => p && Plugins[p].styles)
    .reduce((styleArray, style) => {
      if (style) styleArray.push(style);
      return styleArray;
    }, []);
  return theme =>
    pluginStyles.reduce((styleStr, styleFn) => styleStr + styleFn(theme), "");
};
