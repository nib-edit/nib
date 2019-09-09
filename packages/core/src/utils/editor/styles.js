import Plugins from "../../plugins";

export default (plugins, addons) => {
  const pluginArray = plugins
    .trim()
    .split(" ")
    .map(p => p && Plugins[p]);
  const styles = [...pluginArray, ...addons].reduce((styleArray, plugin) => {
    if (plugin.styles) styleArray.push(plugin.styles);
    return styleArray;
  }, []);
  return theme =>
    styles.reduce((styleStr, styleFn) => styleStr + styleFn(theme), "");
};
