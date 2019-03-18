import { getOS } from "./device";

export const formatKeymap = keymap => {
  const os = getOS();
  let mod = "⌘";
  if (os === "Windows") {
    mod = "^";
  }
  let formattedKeymap = keymap.replace("mod", mod);
  formattedKeymap = formattedKeymap.replace("shift", "⇧");
  formattedKeymap = formattedKeymap.replace("alt", "⌥");
  return formattedKeymap;
};
