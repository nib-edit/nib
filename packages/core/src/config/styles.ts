/**
 * Object to be used as base for style configurations,
 * of different components in editor.
 */
export default {
  // Wrapper div enclosing editor and toolbar
  wrapper: () => {},
  // Main editor component
  editor: () => {},
  toolbar: {
    top: () => {},
    inline: () => {},
  },
  // Small vertical separator in toolbar
  separator: () => {},
  spinner: () => {},
  select: {
    wrapper: () => {},
    label: () => {},
    menu: () => {},
    option: () => {},
  },
  popup: {
    wrapper: () => {},
    arrowTop: () => {},
    arrowBottom: () => {},
  },
  modal: {
    wrapper: () => {},
    title: () => {},
    header: () => {},
    main: () => {},
  },
  input: {
    wrapper: () => {},
    input: () => {},
  },
  icon: () => {},
  button: {
    toolbar: () => {},
    primary: () => {},
  },
  table: {
    table: () => {},
    cellMenu: {
      wrapper: () => {},
      icon: () => {},
      option: () => {},
    },
  },
};
