import block from './block';
import blockquote from './blockquote';
import common from './common';
import color from './color';
import help from './help';
import history from './history';
import image from './image';
import inline from './inline';
import link from './link';
import list from './list';
import { EditorPlugin } from '../types/application';

const Plugins: { [key: string]: EditorPlugin } = {
  block,
  blockquote,
  common,
  color,
  help,
  history,
  image,
  inline,
  link,
  list,
};

export default Plugins;
