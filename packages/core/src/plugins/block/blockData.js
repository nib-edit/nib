import { formatKeymap } from "../../common/utils/key-format";
import { KeymapInfo } from "./keymaps";

export const blockData = [
  {
    value: {
      blockType: "paragraph",
      tag: "p",
      keymap: formatKeymap(KeymapInfo.p)
    },
    label: "Normal",
    name: "p"
  },
  {
    value: {
      blockType: "heading-1",
      tag: "h1",
      keymap: formatKeymap(KeymapInfo.h1)
    },
    label: "Heading 1",
    name: "h1"
  },
  {
    value: {
      blockType: "heading-2",
      tag: "h2",
      keymap: formatKeymap(KeymapInfo.h2)
    },
    label: "Heading 2",
    name: "h2"
  },
  {
    value: {
      blockType: "heading-3",
      tag: "h3",
      keymap: formatKeymap(KeymapInfo.h3)
    },
    label: "Heading 3",
    name: "h3"
  },
  {
    value: {
      blockType: "heading-4",
      tag: "h4",
      keymap: formatKeymap(KeymapInfo.h4)
    },
    label: "Heading 4",
    name: "h4"
  },
  {
    value: {
      blockType: "heading-5",
      tag: "h5",
      keymap: formatKeymap(KeymapInfo.h5)
    },
    label: "Heading 5",
    name: "h5"
  },
  {
    value: {
      blockType: "heading-6",
      tag: "h6",
      keymap: formatKeymap(KeymapInfo.h6)
    },
    label: "Heading 6",
    name: "h6"
  }
];
