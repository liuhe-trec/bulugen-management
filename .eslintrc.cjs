module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: "vue-eslint-parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-essential",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "vue"],
  rules: {
    "no-var": "error", //要求使用let 或者 cconst 不可以使用var
    "no-multiple-empty-lines": ["warn", { max: 1 }], // 不允许多个空格
    "no-useless-escape": "off", //禁止不需要的转义字符
    "@typescript-eslint/no-explicit-any": ["off"],
    "vue/multi-word-component-names":"off",
  },
};
