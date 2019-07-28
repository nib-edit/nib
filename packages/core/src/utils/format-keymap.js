import getOS from "./device";

/**
 * Function returns foratted keymap for display in labels and tooltips.
 */

export default keymap => {
  const os = getOS();
  const mod = os === "Windows" ? "^" : "⌘";

  let formattedKeymap = "";
  if (keymap.label) formattedKeymap = `${keymap.label} `;
  formattedKeymap += keymap.key;
  formattedKeymap = formattedKeymap.replace("mod", mod);
  formattedKeymap = formattedKeymap.replace("shift", "⇧");
  formattedKeymap = formattedKeymap.replace("alt", "⌥");
  return formattedKeymap;
};
