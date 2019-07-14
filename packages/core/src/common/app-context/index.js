import React from "react";

export const defaultConfig = {
  config: {
    plugins: {
      options: "block inline link list image video table help",
      image: {
        uploadCallback: undefined
      }
    },
    toolbar: {
      options: "top",
      top: {
        options: "block inline link list image video table history help",
        block: { options: "p h1 h2 h3 h4 h5 h6", grouped: true },
        inline: { options: "strong em underline strike subsup" }
      },
      inline: {
        options: "block inline link list image",
        block: { options: "p h1 h2 h3" },
        inline: { options: "strong em underline" }
      }
    }
  },
  dispatch: undefined,
  licenseKey: undefined
};

export const AppContext = React.createContext(defaultConfig);
