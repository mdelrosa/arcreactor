var mongoose = require('mongoose');

var SongSchema = mongoose.Schema({
	name: String,
	artist: String,
	src: String,
	id: String
});

var Song = mongoose.model('Song', SongSchema);
exports.Song = Song;

var MashSchema = mongoose.Schema({
	songs: [String],
	Settings: String
});
var Mash = mongoose.model('Mash', MashSchema);
exports.Mash = Mash;