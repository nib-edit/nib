export default {
  plugins: {
    options: "block inline color link list image video table help",
    image: {
      uploadCallback: undefined
    }
  },
  toolbar: {
    options: "top",
    top: {
      options: "block inline color link list image video table history help",
      block: { options: "p h1 h2 h3 h4 h5 h6", grouped: true },
      inline: { options: "strong em underline strike subsup code" }
    },
    inline: {
      options: "block inline link list image",
      block: { options: "p h1 h2 h3" },
      inline: { options: "strong em underline" }
    }
  }
};
