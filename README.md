# Webpack Plugin Relay Touch Dependents [![Build Status](https://travis-ci.org/jrhicks/webpack-plugin-relay-touch-dependents.svg?branch=master)](https://travis-ci.org/jrhicks/webpack-plugin-relay-touch-dependents) [![npm version](https://badge.fury.io/js/webpack-plugin-relay-touch-dependents.svg)](https://badge.fury.io/js/webpack-plugin-relay-touch-dependents)

This is a webpack plugin to trigger efficient webpack rebuilds after your GraphQL schema file has been updated.

You might be interested if:

* You use Webpack, GraphQL, and RelayJS.

* You're automatically [saving schema changes to the schema file](https://facebook.github.io/relay/docs/guides-babel-plugin.html#schema-json).

* You're using  [babel-plugin-transform-relay-hot](https://www.npmjs.com/package/babel-plugin-transform-relay-hot) to load schema file changes without having to completely restart webpack.

* You want your webpack to take the next step and automatically rebuild.

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

License
-----
Copyright (c) <2017> Jeffrey R. Hicks

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
