import Plugins from "../../plugins";

export const getPluginStyles = plugins =>
  plugins
    .trim()
    .split(" ")
    .map(p => p && Plugins[p].style)
    .reduce((styleStr, s) => (styleStr += s || ""), "");
