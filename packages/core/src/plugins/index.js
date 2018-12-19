import block from "./block";
import inline from "./inline";
import list from "./list";
import selMarker from "./sel-marker";

const Plugins = {
  block,
  inline,
  list,
  selMarker
};

//todo: refactor and replace this
export const getPluginList = plugins =>
  plugins.split(" ").map(key => Plugins[key]);

export default Plugins;
