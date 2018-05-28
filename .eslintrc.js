module.exports = {
  extends: [
    "prettier"
    // "prettier/react"
    // "airbnb"
  ],
  plugins: [
    "prettier",
    "react"
  ],
  parserOptions: {
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  env: {
    "es6": true,
    "node": true
  },
  rules: {
    "prettier/prettier": "error"
  }
  // "rules": {
  //   "import/extensions": 0,
  //   "import/no-extraneous-dependencies": 0,
  //   "import/no-unresolved": [2, { "ignore": ["electron"] }],
  //   "linebreak-style": 0
  // }
}
