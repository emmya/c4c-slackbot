require('@babel/register')({
    ignore: [ /(node_modules)/ ],
    presets: [[
      "@babel/preset-env", {
        "targets": {
          "node": "current"
        }
      }
    ]],
    plugins: [
      "@babel/plugin-proposal-export-default-from",
      ["module-resolver", {
        "root": ["."],
        "alias": {
          "/src": "./src",
          "/config": "./config"
        }
      }]
    ]
});

require('./src/index');
