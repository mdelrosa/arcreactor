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
		            	updateSongs()
					}
		        });
		}
		return false;
	});
	// setInterval(updateSongs, 2000)
});

function updateSongs(){
  $.get('/update', function(data){
  	console.log('2 seconds later')
    $('#songs').html(data);
  });
}
