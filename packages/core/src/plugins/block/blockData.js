import {formatKeymap} from "../../common/utils/key-format";
import {KeymapInfo} from "./keymaps";

export const blockData = [
  {
    value: {
      blockType: "paragraph",
      tag: "p",
      keymap: formatKeymap({key: "mod-alt-0"})
    },
    label: "Normal"
  },
  {
    value: {
      blockType: "heading-1",
      tag: "h1",
      keymap: formatKeymap({key: "mod-alt-1"})
    },
    label: "Heading 1"
  },
  {
    value: {
      blockType: "heading-2",
      tag: "h2",
      keymap: formatKeymap({key: "mod-alt-2"})
    },
    label: "Heading 2"
  },
  {
    value: {
      blockType: "heading-3",
      tag: "h3",
      keymap: formatKeymap({key: "mod-alt-3"})
    },
    label: "Heading 3"
  },
  {
    value: {
      blockType: "heading-4",
      tag: "h4",
      keymap: formatKeymap({key: "mod-alt-4"})
    },
    label: "Heading 4"
  },
  {
    value: {
      blockType: "heading-5",
      tag: "h5",
      keymap: formatKeymap({key: "mod-alt-5"})
    },
    label: "Heading 5"
  },
  {
    value: {
      blockType: "heading-6",
      tag: "h6",
      keymap: formatKeymap({key: "mod-alt-6"})
    },
    label: "Heading 6"
  }
];
