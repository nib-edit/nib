import { IPluginStyleFn } from '../../types/application';

const styleFunction: IPluginStyleFn = ({ constants }) => `
  .nib-selection-blur-marker {
    background-color: ${constants.color.blurMarker};
  }
`;

export default styleFunction;
