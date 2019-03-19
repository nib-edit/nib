import { getOS } from "./device";

export const formatKeymap = keymap => {
  const os = getOS();
  let mod = "⌘";
  if (os === "Windows") {
    mod = "^";
  }
  let formattedKeymap = "";
  if (keymap.label) formattedKeymap = `${keymap.label} `;
  formattedKeymap += keymap.key;
  formattedKeymap = formattedKeymap.replace("mod", mod);
  formattedKeymap = formattedKeymap.replace("shift", "⇧");
  formattedKeymap = formattedKeymap.replace("alt", "⌥");
  return formattedKeymap;
};
