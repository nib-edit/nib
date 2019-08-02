/**
 * Separate list has been created here to avoid circular dependency issue.
 */

import block from "../block";
import common from "../common";
import history from "../history";
import image from "../image";
import inline from "../inline";
import link from "../link";
import list from "../list";
import table from "../table";
import video from "../video";

const Plugins = {
  block,
  common,
  history,
  image,
  inline,
  link,
  list,
  table,
  video
};

export default Plugins;
