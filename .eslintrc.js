module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: [
    "prettier",
    "@typescript-eslint",
    "react-hooks",
    "jsx-a11y",
    "simple-import-sort",
    "unused-imports",
  ],
  extends: [
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:tailwindcss/recommended",
    "next/core-web-vitals",
  ],
  ignorePatterns: [
    "./src/**/*.graphql",
    "graphql.ts",
    "graphql.coingecko.ts",
    "graphql.prismic-tags.ts",
    "client.tsx",
  ],
  rules: {
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/triple-slash-reference": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/prop-types": "off",
    "react/display-name": "off",
    "react/react-in-jsx-scope": "off",
    "jsx-a11y/anchor-has-content": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
  },
  settings: {
    react: {
      pragma: "React",
      version: "detect",
    },
  },
  overrides: [
    {
      files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
      rules: {
        "simple-import-sort/imports": [
          "error",
          {
            groups: [
              // Packages `react` related packages come first.
              ["^react", "^next", "@react", "@solana", "^lib", "^\\w"],
              // Internal packages.
              [
                "^types(/.*|$)",
                "^utils(/.*|$)",
                "^hooks(/.*|$)",
                "^pages(/.*|$)",
                "^layouts(/.*|$)",
                "^containers(/.*|$)",
                "^components/ui(/.*|$)",
                "^components/common(/.*|$)",
                "^components/seo(/.*|$)",
                "^components/tables(/.*|$)",
                "^components(/.*|$)",
                "^styles(/.*|$)",
                "^svg(/.*|$)",
              ],
              // Side effect imports.
              ["^\\u0000"],
              // Parent imports. Put `..` last.
              ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
              // Other relative imports. Put same-folder imports and `.` last.
              ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
              // Style imports.
              ["^\\.(?!/?$).+\\.?(sass)$"],
            ],
          },
        ],
      },
    },
    {
      files: ["*.ts", "*.tsx", "*.js", "*.jsx"],
      parser: "@typescript-eslint/parser",
    },
  ],
};
