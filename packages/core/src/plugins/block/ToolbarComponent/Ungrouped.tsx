import * as React from 'react';
import { Fragment } from 'react';

import { ToolbarButton, Icon, Space } from 'nib-ui';

import formatKeymap from '../../../utils/format-keymap';
import { KeymapInfo } from '../keymaps';
import { BlockOption } from '../blockData';

export interface UngroupedMenuProps {
  options: BlockOption[];
  selectedBlockType: string;
  onChange: (blockType: string) => void;
}

const Ungrouped = ({
  options,
  selectedBlockType,
  onChange,
}: UngroupedMenuProps) => (
  <>
    {options.map((opt, index) => {
      const isSelected = opt.value.blockType === selectedBlockType;
      return (
        <Fragment key={`block-btn-${opt.value.tag}`}>
          <ToolbarButton
            name={opt.value.blockType}
            onClick={(evt: MouseEvent) =>
              onChange((evt.target as HTMLElement).getAttribute('name')!)
            }
            selected={isSelected}
            title={formatKeymap(KeymapInfo[opt.value.tag])}
          >
            <Icon name={opt.value.tag} selected={isSelected} />
          </ToolbarButton>
          {index < options.length - 1 && <Space />}
        </Fragment>
      );
    })}
  </>
);

export default Ungrouped;
