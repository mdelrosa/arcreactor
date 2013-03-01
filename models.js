var mongoose = require('mongoose');

var SongSchema = mongoose.Schema({
	id: String,
	beats: String
});

var Song = mongoose.model('Song', SongSchema);
exports.Song = Song;

var MashSchema = mongoose.Schema({
	songs: [String],
	Settings: String
});
var Mash = mongoose.model('Mash', MashSchema);
exports.Mash = Mash;