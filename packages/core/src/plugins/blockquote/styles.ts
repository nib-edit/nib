// todo: styles to be re-thought
import { IPluginStyleFn } from '../../types/application';

const styleFunction: IPluginStyleFn = () => `
  .ProseMirror blockquote {
    box-sizing: border-box;
    padding-left: 16px;
    border-left: 2px solid rgb(223, 225, 230);
    margin: 1.143rem 0px 0px;
  }
`;

export default styleFunction;
