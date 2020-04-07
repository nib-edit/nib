// todo: styles to be re-thought
import { PluginStyleFn } from '../../types/application';

const styleFunction: PluginStyleFn = () => `
  .ProseMirror blockquote {
    box-sizing: border-box;
    padding-left: 16px;
    border-left: 2px solid rgb(223, 225, 230);
    margin: 1.143rem 0px 0px;
  }
`;

export default styleFunction;
