/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["import", "@typescript-eslint", "sonarjs"],
  extends: [
    "react-app",
    "airbnb",
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:sonarjs/recommended",
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
      },
    ],
    "no-plusplus": "off",
    "react/require-default-props": "off",
    "react/prop-types": "off",
    "import/prefer-default-export": "off",
    "import/newline-after-import": "error",
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        pathGroups: [
          {
            pattern: "types",
            group: "internal",
          },
          {
            pattern: "lib/**",
            group: "internal",
          },
          {
            pattern: "routes/**",
            group: "internal",
          },
          {
            pattern: "components/**",
            group: "internal",
          },
          {
            pattern: "client-utils/**",
            group: "internal",
          },
          {
            pattern: "server-utils/**",
            group: "internal",
          },
        ],
      },
    ],
    "react/react-in-jsx-scope": 0,
    "react/jsx-uses-react": 0,
    "react/jsx-filename-extension": 0,
    "react/prefer-stateless-function": [
      1,
      {
        ignorePureComponents: true,
      },
    ],
    "jsx-a11y/href-no-hash": [0],
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["to"],
        aspects: ["noHref", "invalidHref", "preferButton"],
      },
    ],
    "no-return-await": "off",
    "@typescript-eslint/return-await": ["error", "in-try-catch"],
    "no-console": "off",
  },
  overrides: [
    {
      files: ["**/*.tsx"],
      rules: {
        // for tailwind class issues
        "sonarjs/no-duplicate-string": "off",
      },
    },
    {
      files: ["**/*.test.tsx", "**/*.test.ts"],
      rules: {
        "import/no-extraneous-dependencies": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-var-requires": "off",
        "sonarjs/no-duplicate-string": "off",
        "sonarjs/no-identical-functions": "off",
      },
    },
  ],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: "./",
      },
    },
  },
};
