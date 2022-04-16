import { terser } from "rollup-plugin-terser";
import { external } from "@aminnairi/rollup-plugin-external";
import typescript from "@rollup/plugin-typescript";
import remove from "rollup-plugin-delete";

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
    isProduction && terser()
  ],
  output: {
    file: "dist/index.js",
    format: "cjs"
  }
};
