import getOS from './device';
import { IKeymapInfo } from '../types/application';

/**
 * Function returns foratted keymap for display in labels and tooltips.
 */

export default (keymap: IKeymapInfo) => {
  const os = getOS();
  const mod = os === 'Windows' ? '^' : '⌘';

  let formattedKeymap = '';
  if (keymap.label) formattedKeymap = `${keymap.label} `;
  formattedKeymap += keymap.key;
  formattedKeymap = formattedKeymap.replace('Mod', mod);
  formattedKeymap = formattedKeymap.replace('Shift', '⇧');
  formattedKeymap = formattedKeymap.replace('Alt', '⌥');
  return formattedKeymap;
};
