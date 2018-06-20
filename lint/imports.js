// eslint-disable-next-line import/no-commonjs
module.exports = {
  plugins: ["import"],
  settings: {
    "import/core-modules": ["electron", "redux-saga/effects"]
  },
  rules: {
    "import/named": "error",
    "import/no-unresolved": ["error", { caseSensitive: true }],
    "import/default": "error",
    "import/namespace": "error",
    "import/no-absolute-path": "error",
    "import/no-dynamic-require": "error",
    "import/no-self-import": "error",
    "import/no-useless-path-segments": "error",
    "import/export": "error",
    "import/no-named-as-default": "error",
    "import/no-named-as-default-member": "error",
    "import/no-mutable-exports": "error",
    "import/no-extraneous-dependencies": ["error", { devDependencies: false }],
    "import/no-commonjs": "error",
    "import/no-amd": "error",

    // Style
    "import/first": "error",
    "import/order": ["error", { "newlines-between": "never" }],
    "import/exports-last": "error",
    "import/no-duplicates": "error",
    "import/extensions": ["error", "never"],
    "import/newline-after-import": ["error", { count: 1 }],
    "import/prefer-default-export": "error",
    "import/max-dependencies": ["error", { max: 10 }],
    "import/no-unassigned-import": "error",
    "import/no-named-default": "error"
  }
};
