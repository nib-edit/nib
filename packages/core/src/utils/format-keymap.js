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
  formattedKeymap = formattedKeymap.replace("Mod", mod);
  formattedKeymap = formattedKeymap.replace("Shift", "⇧");
  formattedKeymap = formattedKeymap.replace("Alt", "⌥");
  return formattedKeymap;
};
