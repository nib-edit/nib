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
        "packages/docs/plugins/Block/index.jsx",
        "packages/docs/plugins/Inline/index.jsx",
        "packages/docs/plugins/History/index.jsx",
        "packages/docs/plugins/Link/index.jsx",
        "packages/docs/plugins/List/index.jsx",
        "packages/docs/plugins/Image/index.jsx"
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
        "packages/docs/demo/Themed/index.jsx",
        "packages/docs/demo/InlineToolbar/index.jsx",
        "packages/docs/demo/ConvertToHTML/index.jsx"
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
      base: "#304957",
      link: "#89a6b7",
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
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        { test: /\.svg$|\.png$/, loader: "url-loader" }
      ]
    }
  }
};
