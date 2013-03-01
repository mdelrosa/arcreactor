
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.post('/mash', user.mash);
app.post('/upload', user.upload);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

// var echojs = require('echojs');

// var echo = echojs({
//   key: 'VZC2UXVOYIIFGURRH'
// });

// // http://developer.echonest.com/docs/v4/song.html#search
// echo('song/search').get({
//   artist: 'radiohead',
//   title: 'karma police'
// }, function (err, json) {
//   console.log(json.response);
// });