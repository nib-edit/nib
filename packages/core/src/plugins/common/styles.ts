import { PluginStyleFn } from '../../types/application';

const styleFunction: PluginStyleFn = ({ constants }) => `
  .nib-selection-blur-marker {
    background-color: ${constants.color.blurMarker};
  }
`;

export default styleFunction;
