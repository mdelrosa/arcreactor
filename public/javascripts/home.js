$(document).ready(function(){
	$('#upload').submit(function () {
		var song = $('#song').val();
		var artist = $('#artist').val();
		var location = $('#location').val();
		if (location){	
			$.post("/upload", { "song": song, "artist": artist, "location": location },
				function(err){
					console.log(err);
					console.log('hi');
		            if (err){
		            	console.log('error',err);
		            }
		            else{
		            	console.log('hi');
		            	$('#song').val('');
						$('#artist').val('');
						$('#location').val('');
					}
		        });
		}
		return false;
	});
});