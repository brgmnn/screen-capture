module.exports = {
  "env": {
    "development": {
      "application/javascript": {
        "presets": [
          [
            "env",
            {
              "targets": { "electron": "2" }
            }
          ],
          "react"
        ],
        "plugins": ["transform-async-to-generator"],
        "sourceMaps": "inline"
      }
    },
    "production": {
      "application/javascript": {
        "presets": [
          [
            "env",
            {
              "targets": { "electron": "2" }
            }
          ],
          "react"
        ],
        "plugins": ["transform-async-to-generator"],
        "sourceMaps": "none"
      }
    }
  }
};