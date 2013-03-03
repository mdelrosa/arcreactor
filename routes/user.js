
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.upload = function(req, res){
  res.send("respond with a resource");
};

exports.mash = function(req, res){
  res.render("mash", {title: 'Mashup'});
};