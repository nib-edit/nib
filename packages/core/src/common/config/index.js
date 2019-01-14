export const defaultConfig = {
  plugins: { options: "block inline link list history" },
  toolbar: {
    options: "top inline",
    top: {
      options: "block inline link list history",
      block: { options: "p h1 h2 h3 h4 h5 h6", grouped: true },
      inline: { options: "strong em underline" }
    },
    inline: {
      options: "block inline",
      block: { options: "p h1 h2", grouped: false },
      inline: { options: "strong em underline" }
    }
  }
};
