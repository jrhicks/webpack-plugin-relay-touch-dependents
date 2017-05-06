var fetch = require('node-fetch');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var fs = require('fs');
var path = require('path');
var graphql = require('graphql').graphql;
var introspectionQuery = require('graphql/utilities').introspectionQuery;
var schema = require('./app/schema/schema');
var childProcess = require('child_process');

/*eslint no-console: ["error", { allow: ["log", warn", "error"] }] */

const SCHEMA_PATH = path.join(__dirname, './app/schema/schema.json');
const SERVER_PATH = __dirname + '/app/server.js';
const CONFIG_PATH = __dirname + '/app/webpack.config.js';
const WEBPACK_BIN = path.join(__dirname, '../node_modules/.bin/webpack');

function testLog(msg) {
  console.log('[TEST] ' + msg);
}

function webpackLog(msg) {
  console.log('[WEBPACK] ' + msg);
}

function serverLog(msg) {
  console.log('[SERVER] ' + msg);
}

function delay(t) {
  return function() {
    return new Promise(function(resolve) {
      testLog('Wait ' + t);
      setTimeout(resolve, t);
    });
  }
}

function startServer() {
  function start() {
    testLog('Starting server');
    const server = childProcess.spawn('node', [SERVER_PATH]);
    server.stdout.on('data', function (data) {
      serverLog(data.toString());
    });

  }
  fetch('http://localhost:8080/close')
    .then(function() {
      testLog('Ensuring server not running');
      start();
      })
    .catch(function() {
      start();
      });
}

function startWebpack() {
  testLog('Starting Webpack');
  const webpack = childProcess.spawn(WEBPACK_BIN, ['-w', '--config', CONFIG_PATH]);
  webpack.stdout.on('data', function (data) {
    webpackLog(data.toString());
  });
  return webpack;
}

function clearSchema() {
  let data = '{}';
  testLog('Removing Schema.json');
  fs.writeFileSync(SCHEMA_PATH, data);
}

function writeSchemaPromise() {
  return graphql(schema, introspectionQuery).then(function(result) {
    const data = JSON.stringify(result, null, 2);
    testLog('Updating Schema at ' + SCHEMA_PATH);
    fs.writeFileSync(SCHEMA_PATH, data);
  });
}

describe('webpack-plugin-relay-touch-dependents', function() {
  it(
    'should cause webpack to bundle RelayQL transformations when schema.json is hot updated',
    function() {
      this.timeout(40000); // Changes timeout for chai
      clearSchema();
      startServer();
      startWebpack();
      return expect(
        delay(10000)()
          .then(writeSchemaPromise)
          .then(delay(20000))
          .then(function() {
            return fetch('http://localhost:8080/bundle.js');
          })
          .then(function(response) {
            return response.text();
          })
      ).to.eventually.contain("fieldName: 'id'");
    });
});
