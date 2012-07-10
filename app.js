
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , bootstrap = require('bootstrap-stylus')
  , stylus = require('stylus')
  , sys = require('sys')
  , rest = require('restler')
  , config = require('./public/javascripts/config.js')
  , face = require('./public/javascripts/face.js');

var app = module.exports = express.createServer();

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(bootstrap());
}

app.use(stylus.middleware({
  src: __dirname + '/public',
  compile: compile
}));

var image_url = 'http://farm6.static.flickr.com/5127/5284942130_ab25c2dafd_b.jpg';
face.api.get(image_url, function(err, data) {
  console.log(data);
});

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
