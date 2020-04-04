import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from '@emotion/styled';

const SelectHeight = 28;
const SelectWidth = 112;

const Grouped = ({ options, selectedBlockType, onChange }) => {
  const [Select, setSelect] = useState(undefined);
  import('nib-ui-select').then((args) => {
    const { Select: NibUISelect } = args.default;
    setSelect(NibUISelect);
  });

  let selectedOption;
  if (selectedBlockType) {
    selectedOption = options.find(
      (opt) => opt.value.blockType === selectedBlockType
    );
  } else {
    selectedOption = { value: undefined, label: 'Other' };
  }
  if (!Select) return <Placeholder />;
  return (
    <Select
      height={SelectHeight}
      width={SelectWidth}
      onChange={(option) => onChange(option.value.blockType)}
      options={options}
      selectedOption={selectedOption}
      isSearchable={false}
    />
  );
};

const Placeholder = styled.div`
  height: ${SelectHeight}px;
  width: ${SelectWidth}px;
`;

Grouped.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  options: PropTypes.array.isRequired,
  selectedBlockType: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Grouped.defaultProps = {
  selectedBlockType: undefined,
};

export default Grouped;
