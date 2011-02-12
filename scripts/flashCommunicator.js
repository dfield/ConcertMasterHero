
var flashMovie = getFlashMovie("synthesizer");

function getFlashMovie(movieName) {
	var isIE = navigator.appName.indexOf("Microsoft") != -1;
	return (isIE) ? window[movieName] : document[movieName];
}

function playNote(msg){
	flashMovie.playNote(msg);
}

function stopNote(){
	flashMovie.stopNote("");
}
