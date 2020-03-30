import { KeyValueType, ThemeType } from './editor-theme';

type StyleFunction = ({ theme }: { theme: ThemeType }) => KeyValueType | void;

export type StyleConfigType = {
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
};

export interface EditorStyleType extends StyleConfigType {
  constants: ThemeType;
}
