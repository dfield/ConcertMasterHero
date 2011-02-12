function draw(){
	var paper = Raphael(0, 0, 500, 500);
	var circle = paper.circle(125, 125, 75);
	var rod = paper.rect(10, 10, 50, 50);
	circle.attr("stroke", "#fff");
}

var TIME_STEP = 20;
//ms a note appears on screen before it is actually played
var DISPLAY_TIME = 4000;

STATE_WAIT = "WAIT";
STATE_PLAY = "PLAY";
STATE_DEMO = "DEMO";

var currentState	= STATE_WAIT;
var currentTime		= 0;
var currentSong		= null;

var currentDispIndex = 0;
var currentPlayIndex = 0;

setInterval(step, TIME_STEP);
function step(){
	stepSongPlayer();
	stepPlayerUI();
	
	currentTime += TIME_STEP;
}

function stepSongPlayer(){
	//--------------Song Player--------------
	switch(currentState){
		case STATE_WAIT:
			//do nothing
			
			break;
			
		case STATE_DEMO:
			//play demo song
			if(!currentSong){
				currentState = STATE_WAIT;
				break;
			}
			
			playNotes(currentSong);
			
			break;
			
		case STATE_PLAY:
			//playing along
			if(!currentSong){
				currentState = STATE_WAIT;
				break;
			}
			
			displayNotes(currentSong);
			
			break;
	}
	//------------End Song Player------------	
}

function stepPlayerUI(){
	//move bow
	
	
	
}

function displayNotes(song){
	
	var note = song.getNote(currentPlayIndex);
	
	if(note.getPosition() <= currentTime - DISPLAY_TIME){
		//display note and prepare to display next
		//playNote(note.pitch + ":" + note.getDuration());
		
		//######show note here
		
		currentPlayIndex++;
	}
}

function playNotes(song){
	
	var note = song.getNote(currentPlayIndex);
	
	if(note.getPosition() <= currentTime){
		//play note and prepare to play next
		playNote(note.pitch + ":" + note.getDuration());
		currentPlayIndex++;
	}
}

function demoSong(songName){
	currentState = STATE_DEMO;
	startSong(songName);
}

function playSong(songName){
	currentState = STATE_PLAY;
	startSong(songName);
}

function startSong(songName){
	var songData = getSongCode(songName);
	if(songData == "")
		return;
	
	currentTime = 0;
	currentSong = new Song(songData);
	
}

/*

Flash functions:
playNote("pitch:duration");
setVolume("volume");
stopNote("");

*/
