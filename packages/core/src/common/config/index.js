import React from "react";

export const defaultConfig = {
  plugins: {
    options: "block inline link list image table help",
    image: {
      uploadCallback: _ => {}
    }
  },
  toolbar: {
    options: "top inline",
    top: {
      options: "block inline link list image table history help",
      block: { options: "p h1 h2 h3 h4 h5 h6", grouped: true },
      inline: { options: "strong em underline strike subsup" }
    },
    inline: {
      options: "block inline",
      block: { options: "p h1 h2", grouped: false },
      inline: { options: "strong em underline" }
    }
  }
};

export const ConfigContext = React.createContext(defaultConfig);
