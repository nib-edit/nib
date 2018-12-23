const path = require("path");

module.exports = {
  title: "Nib",
  sections: [
    {
      name: "Introduction",
      content: "packages/docs/Introduction/Readme.md"
    },
    {
      name: "Setup",
      content: "packages/docs/Setup/Readme.md"
    },
    {
      name: "Props",
      content: "packages/docs/Props/Readme.md"
    },
    {
      name: "Examples",
      pagePerSection: true,
      sectionDepth: 1,
      content: "packages/docs/examples/Readme.md",
      components: [
        "packages/docs/examples/Basic/index.jsx",
        "packages/docs/examples/BlockInline/index.jsx",
        "packages/docs/examples/Lists/index.jsx",
        "packages/docs/examples/InlineToolbar/index.jsx",
        "packages/docs/examples/Themed/index.jsx"
      ]
    }
  ],
  exampleMode: "hide",
  template: {
    favicon: "packages/docs/styleguide/pen.png"
  },
  pagePerSection: true,
  theme: {
    color: {
      base: "#304957",
      link: "#304957",
      linkHover: "#89a6b7",
      sidebarBackground: "#304957"
    }
  },
  getComponentPathLine() {
    return;
  },
  styleguideComponents: {
    LogoRenderer: path.join(__dirname, "packages/docs/styleguide/Logo"),
    TableOfContentsRenderer: path.join(
      __dirname,
      "packages/docs/styleguide/TableOfContentsRenderer"
    )
  },
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/react",
                {
                  plugins: ["@babel/plugin-proposal-class-properties"]
                }
              ]
            }
          }
        },
        { test: /\.svg$|\.png$/, loader: "url-loader" }
      ]
    }
  }
};
