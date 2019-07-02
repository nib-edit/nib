const path = require("path");

module.exports = {
  title: "Nib",
  serverPort: 6003,
  assetsDir: "packages/docs/styleguide",
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
      name: "Plugins",
      pagePerSection: true,
      sectionDepth: 1,
      content: "packages/docs/plugins/Readme.md",
      components: [
        "packages/docs/plugins/Basic/index.jsx",
        "packages/docs/plugins/Block/index.jsx",
        "packages/docs/plugins/Help/index.jsx",
        "packages/docs/plugins/History/index.jsx",
        "packages/docs/plugins/Image/index.jsx",
        "packages/docs/plugins/Inline/index.jsx",
        "packages/docs/plugins/Link/index.jsx",
        "packages/docs/plugins/List/index.jsx",
        "packages/docs/plugins/Table/index.jsx"
      ]
    },
    {
      name: "Demo",
      pagePerSection: true,
      sectionDepth: 1,
      content: "packages/docs/demo/Readme.md",
      components: [
        "packages/docs/demo/Basic/index.jsx",
        "packages/docs/demo/BlockInline/index.jsx",
        "packages/docs/demo/FullFeatured/index.jsx",
        "packages/docs/demo/ConvertToHTML/index.jsx",
        "packages/docs/demo/InlineToolbar/index.jsx",
        "packages/docs/demo/Themed/index.jsx"
      ]
    },
    {
      name: "License",
      content: "packages/docs/License/Readme.md"
    },
    {
      components: [
        "packages/docs/Introduction/TopBar.jsx",
        "packages/docs/License/index.jsx"
      ]
    }
  ],
  exampleMode: "hide",
  template: {
    favicon: "/Nib/pen.png"
  },
  pagePerSection: true,
  theme: {
    color: {
      base: "#212121",
      link: "#880061",
      linkHover: "#90a4ae",
      sidebarBackground: "#880061"
    },
    fontFamily: {
      base: ['"Roboto"', "sans-serif"],
      monospace: ["Consolas", '"Liberation Mono"', "Menlo", "monospace"]
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
    ),
    HeadingRenderer: path.join(
      __dirname,
      "packages/docs/styleguide/HeadingRenderer"
    ),
    StyleGuideRenderer: path.join(
      __dirname,
      "packages/docs/styleguide/StyleGuideRenderer"
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
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {test: /\.svg$|\.png$/, loader: "url-loader"}
      ]
    }
  }
};
