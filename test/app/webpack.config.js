var RelayTouchDependents = require('../../index.js');

module.exports = {
  entry: __dirname + '/browser.js',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: [
            [
              "transform-relay-hot",
              {
                schemaJsonFilepath: "./test/app/schema/schema.json",
                watchInterval: 2000,
                verbose: true
              }
            ]
          ],
          presets: [
            "es2015",
            "react"
          ]
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  plugins: [
    new RelayTouchDependents({
      jsonPath: __dirname + '/schema/schema.json',
      wait: 3000,
    }),
  ],
};
