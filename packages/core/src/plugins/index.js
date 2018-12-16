import block from "./block";
import inline from "./inline";
import list from "./list";

const Plugins = {
  block,
  inline,
  list
};

export const getPluginList = plugins =>
  plugins.split(" ").map(key => Plugins[key]);

export default Plugins;
