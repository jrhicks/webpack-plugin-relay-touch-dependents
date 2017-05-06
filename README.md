Webpack Plugin Relay Touch Dependents
---------------------
Trigger efficient webpack rebuilds after your GraphQL Schema has been updated and saved to JSON.

Assumptions
-----------
* You already have a [mechanism to save schema changes to JSON](https://facebook.github.io/relay/docs/guides-babel-plugin.html#schema-json)

* You are using [babel-plugin-transform-relay-hot](https://www.npmjs.com/package/babel-plugin-transform-relay-hot) to reconfigure your babel compiler without having to completely restart webpack.

* You are NOT using [webpack-plugin-graphql-schema-hot](https://github.com/nodkz/webpack-plugin-graphql-schema-hot) because you are vending your graph from a non-Node backend.

Preview
-------------
![Console Output Preview](https://raw.githubusercontent.com/jrhicks/webpack-plugin-relay-touch-dependents/master/screenshot1.png)

Install
--------
```
yarn add webpack-plugin-relay-touch-dependents -D
```

Usage
--------
```
var RelayTouchDependents = require('webpack-plugin-relay-touch-dependents');

...
  plugins: [
    new RelayTouchDependents({
      jsonPath: __dirname + '/schema/schema.json',
      wait: 3000,
    }),
  ],
...

```
