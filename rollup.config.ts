import { terser } from "rollup-plugin-terser";
import { external } from "@aminnairi/rollup-plugin-external";
import typescript from "@rollup/plugin-typescript";
import remove from "rollup-plugin-delete";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const isDevelopment = process.env.NODE_ENV === "development";
const isProduction = process.env.NODE_ENV === "production";

export default {
  input: "src/index.ts",
  plugins: [
    external(),
    isProduction && remove({
      targets: "dist/*"
    }),
    typescript({
      tsconfig: "tsconfig.json"
    }),
    commonjs(),
    nodeResolve(),
    isProduction && terser()
  ],
  output: [
    {
      file: "dist/index.js",
      format: "cjs"
    },
    {
      file: "dist/index.mjs",
      format: "esm"
    }
  ]
};
