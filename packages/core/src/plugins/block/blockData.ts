import formatKeymap from '../../utils/format-keymap';
import { KeymapInfo } from './keymaps';
import { KeymapInfoType } from '../../types/application';

export interface BlockOption {
  value: {
    blockType: string;
    tag: string;
    keymap: string;
  };
  label: string;
}

const blockData: BlockOption[] = [
  {
    value: {
      blockType: 'paragraph',
      tag: 'p',
      keymap: formatKeymap({ key: KeymapInfo.p.key }),
    },
    label: 'Normal',
  },
  {
    value: {
      blockType: 'heading-1',
      tag: 'h1',
      keymap: formatKeymap({ key: KeymapInfo.h1.key }),
    },
    label: 'Heading 1',
  },
  {
    value: {
      blockType: 'heading-2',
      tag: 'h2',
      keymap: formatKeymap({ key: KeymapInfo.h2.key }),
    },
    label: 'Heading 2',
  },
  {
    value: {
      blockType: 'heading-3',
      tag: 'h3',
      keymap: formatKeymap({ key: KeymapInfo.h3.key }),
    },
    label: 'Heading 3',
  },
  {
    value: {
      blockType: 'heading-4',
      tag: 'h4',
      keymap: formatKeymap({ key: KeymapInfo.h4.key }),
    },
    label: 'Heading 4',
  },
  {
    value: {
      blockType: 'heading-5',
      tag: 'h5',
      keymap: formatKeymap({ key: KeymapInfo.h5.key }),
    },
    label: 'Heading 5',
  },
  {
    value: {
      blockType: 'heading-6',
      tag: 'h6',
      keymap: formatKeymap({ key: KeymapInfo.h6.key }),
    },
    label: 'Heading 6',
  },
];

export default blockData;
