import { PluginStyleFunction } from '../../types/application';

const styleFunction: PluginStyleFunction = ({ constants }) => `
  .nib-selection-blur-marker {
    background-color: ${constants.color.blurMarker};
  }
`;

export default styleFunction;
