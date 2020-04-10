import { PluginStyleFn } from '../../types/application';

const styleFunction: PluginStyleFn = ({ constants }) => `
  .ProseMirror code {
    background-color: ${constants.color.background.secondary};
    border-radius: ${constants.borderRadius.small};
    border: ${constants.border.light};
    color: ${constants.color.text.secondary};
  }
`;

export default styleFunction;
