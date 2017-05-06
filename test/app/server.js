var express = require('express')
var graphqlHttp = require('express-graphql')
var schema = require('./schema/schema')
var app = express()
app.use('/graphql', graphqlHttp({schema: schema}))
app.use('/', express.static(__dirname + '/public'))

app.listen(8080, function() {
  console.log('[Server] Listening on 8080')
});

app.get('/close',
    function(req, res) {
        res.redirect('/');
        setTimeout(function () {
          console.log("[SERVER] Closing on 8080");
          app.close();
        }, 0)
    }
);
