import js from "@eslint/js";
import globals from "globals";

export default [
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      globals: globals.browser
    },
    rules: {}
  }
];
