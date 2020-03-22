interface KeyValueType {
  [key: string]: any;
}

export interface ThemeType {
  color: KeyValueType;
  fontSize: KeyValueType;
  fontWeight: KeyValueType;
  borderRadius: KeyValueType;
  border: KeyValueType;
  boxShadow: KeyValueType;
}

type styleFn = ({ theme }?: { theme: ThemeType }) => KeyValueType | void;

export interface StylesType {
  wrapper: styleFn;
  editor: styleFn;
  toolbar: {
    top: styleFn;
    inline: styleFn;
  };
  separator: styleFn;
  spinner: styleFn;
  select: {
    wrapper: styleFn;
    label: styleFn;
    menu: styleFn;
    option: styleFn;
  };
  popup: {
    wrapper: styleFn;
    arrowTop: styleFn;
    arrowBottom: styleFn;
  };
  modal: {
    wrapper: styleFn;
    title: styleFn;
    header: styleFn;
    main: styleFn;
  };
  input: {
    wrapper: styleFn;
    input: styleFn;
  };
  icon: styleFn;
  button: {
    toolbar: styleFn;
    primary: styleFn;
  };
  table: {
    table: styleFn;
    cellMenu: {
      wrapper: styleFn;
      icon: styleFn;
      option: styleFn;
    };
  };
}

export interface EditorStyleType extends StylesType {
  constants: ThemeType;
}
