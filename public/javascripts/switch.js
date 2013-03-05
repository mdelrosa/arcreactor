//switch.js
//my body is ready

$(document).ready(function() {


	//some dummy code that will handle analyzing/switching between bars
	var switchSongs = function() {
		var audio = $('.audioMain');
		console.log($('.audioMain').currentTime);
	}

	var fireInterval = function() {
	  setInterval(switchSongs, 100)
	}

});