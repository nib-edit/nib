import { IKeyValue } from './common';
import { IEditorTheme } from './editor-theme';

interface StyleFunction {
  ({ theme }: { theme: IEditorTheme }): IKeyValue | void;
}

export interface IEditorStyleConfig {
  wrapper: StyleFunction;
  editor: StyleFunction;
  toolbar: {
    top: StyleFunction;
    inline: StyleFunction;
  };
  separator: StyleFunction;
  spinner: StyleFunction;
  select: {
    wrapper: StyleFunction;
    label: StyleFunction;
    menu: StyleFunction;
    option: StyleFunction;
  };
  popup: {
    wrapper: StyleFunction;
    arrowTop: StyleFunction;
    arrowBottom: StyleFunction;
  };
  modal: {
    wrapper: StyleFunction;
    title: StyleFunction;
    header: StyleFunction;
    main: StyleFunction;
  };
  input: {
    wrapper: StyleFunction;
    input: StyleFunction;
  };
  icon: StyleFunction;
  button: {
    toolbar: StyleFunction;
    primary: StyleFunction;
  };
  table: {
    table: StyleFunction;
    cellMenu: {
      wrapper: StyleFunction;
      icon: StyleFunction;
      option: StyleFunction;
    };
  };
}

export interface IEditorStyle extends IEditorStyleConfig {
  constants: IEditorTheme;
}
