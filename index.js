var filewatcher = require('filewatcher');
var touch = require('touch');

var RELAY_SIGNATURE = 'function _taggedTemplateLiteral';

function WebpackPluginGraphqlJSONHot(options) {
  this.options = options;
  this.log = msg => {
    // if (this.verbose) {
    console.log('[relay-touch-dependents]:', msg);
    // }
  };

  this.err = msg => {
    // if (!this.hideErrors) {
    console.error('[ERROR][relay-touch-dependents]:', msg);
    // }
  };
}

WebpackPluginGraphqlJSONHot.prototype.apply = function(compiler) {
  var jsonPath = this.options.jsonPath;
  var wait = this.options.wait;
  var watcher = filewatcher();
  // var token;
  var dependents = [];

  var that = this;
  compiler.plugin("compilation", function(compilation) {
    compilation.plugin('succeed-module', function(module){
      if (!dependents.includes(module.resource)) {
        if (module.loaders.length > 0 && module._source._value.includes(RELAY_SIGNATURE)) {
          that.log('Dependent: ' + module.rawRequest);
          dependents.push(module.resource);
        }
      }
    });
  });

  watcher.add(jsonPath);
  that.log('Watching ' + jsonPath);
  watcher.on('change', function() {
    that.log('Schema changed.  Touching dependents in: ' + wait + 'ms');
    setTimeout(
      function() {
        that.log('Touching ' + dependents.length + ' dependent(s).');
        dependents.forEach(function(f) {
          touch(f, { nocreate: true });
        });
      }, wait);
    }); // end watcher on
};

module.exports = WebpackPluginGraphqlJSONHot;
