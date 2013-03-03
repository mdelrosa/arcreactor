
/*
 * GET home page.
 */

var echojs = require('echojs'),
    echoAPI = "VZC2UXVOYIIFGURRH";

var echo = echojs({
  key: echoAPI
});

exports.index = function(req, res){
  //randomly generate pie graphic
  var counts = [];
  for (i=0;i<10;i++) {
  	counts.push(Math.floor(Math.random()*10))
  }
  echo('song/search').get({
    artist: 'taylor swift',
    title: 'trouble'
  }, function (err, json) {
    console.log(json.response);
  });
  res.render('index', { title: 'ArcReactor', counts: counts, APIkey: echoAPI});
};