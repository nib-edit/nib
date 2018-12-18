import includePaths from "rollup-plugin-includepaths";
import babel from "rollup-plugin-babel";
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { uglify } from "rollup-plugin-uglify";
import bundleSize from "rollup-plugin-bundle-size";
import copy from "rollup-plugin-copy";

const globals = {
  react: "React",
  "react-dom": "ReactDOM"
};

const external = ["react", "react-dom"];

const getConfig = packageName => {
  if (packageName !== "core") {
    globals.styled = "@emotion/styled";
    globals["emotion-theming"] = "emotion-theming";
    external.push("styled");
    external.push("emotion-theming");
  }
  return {
    input: `packages/${packageName}/index.js`,
    output: {
      file: `packages/${packageName}/build/index.js`,
      format: "umd",
      globals,
      name: packageName
    },
    external,
    plugins: [
      uglify(),
      bundleSize(),
      nodeResolve({
        browser: true
      }),
      babel({
        presets: ["@babel/preset-env", "@babel/preset-react"],
        plugins: [
          [
            "emotion",
            {
              hoist: true
            }
          ],
          [
            "@babel/plugin-proposal-class-properties",
            {
              loose: true
            }
          ]
        ],
        exclude: "node_modules/**"
      }),
      includePaths({
        extensions: [".js", ".jsx"]
      }),
      commonjs({
        include: "node_modules/**"
      }),
      copy({
        [`packages/${packageName}/package.json`]: `packages/${packageName}/build/package.json`,
        verbose: true
      })
    ]
  };
};

export default args => {
  return getConfig(args.name);
};
