var React = require('react') // eslint-disable-line no-unused-vars
var ReactDOM = require('react-dom')
var Relay = require('react-relay') // eslint-disable-line no-unused-vars
var App = require('./App')

ReactDOM.render(
  // At the top of a Relay tree is the root container, which we pass our
  // wrapped App component to, as well as the query configuration ("route"). If
  // we need to render a different component, say as a result of a navigation
  // event, then we would update it here.
  // We also illustrate the use of the onReadyStateChange handler in case
  // there's a network error, etc
  <Relay.RootContainer Component={App.Container} route={App.queries}
    onReadyStateChange={({error}) => { if (error) console.error(error) }} />, // eslint-disable-line no-console

  document.getElementById('content')
)
