
var TIME_STEP = 20;
//ms a note appears on screen before it is actually played
var DISPLAY_TIME = 4000;

STATE_WAIT = "WAIT";
STATE_PLAY = "PLAY";
STATE_DEMO = "DEMO";

var currentState	= STATE_WAIT;
var currentTime		= 0;
var currentSong		= null;

var noteScore = 0;
var noteMax = 0;
var songScore = 0;
var songMax = 0;

var currentDispIndex = 0;
var currentPlayIndex = 0;

var MOUSE_STABLE = 6;

var prevMouseX = 0;
var prevMouseY = 0;
var mouseStability = 0;

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
			if(currentTime >= currentSong.getEndTime())
				currentState = STATE_WAIT;
			
			break;
			
		case STATE_PLAY:
			//playing along
			if(!currentSong){
				currentState = STATE_WAIT;
				break;
			}
			
			displayNotes(currentSong);
			playNotes(currentSong);
			if(currentTime >= currentSong.getEndTime() + 2 * DISPLAY_TIME){
				//end song and show score
				currentState = STATE_WAIT;
			}
			
			break;
	}
	//------------End Song Player------------
}

function stepPlayerUI(){
	if(currentState == STATE_PLAY && currentTime > 2 * DISPLAY_TIME){
		songMax++;
		
		var board = document.getElementById("song_score");
		board.innerHTML = Math.ceil(songScore / songMax * 100);
	}
	
	//no action if mouse is outside of play area
	if(mouseX > 900){
		stopNote();
		return;
	}
	
	//match bow to strings
	var angles = new Array(4);
	for(var a = 0; a < 4; a++){
		var string = ViolinString.getStringByID(a);
		angles[a] = Math.atan2(mouseY - string.y, mouseX - string.x) * 180 / Math.PI;
	}
	
	var greatestAngle = Math.max(angles[0], angles[1], angles[2], angles[3]);
	
	var stringNum = -1;
	switch(greatestAngle){
		case angles[0]:
			stringNum = 0;
			break;
			
		case angles[1]:
			stringNum = 1;
			break;
			
		case angles[2]:
			stringNum = 2;
			break;
			
		case angles[3]:
			stringNum = 3;
			break;
			
		default:
			//error, bow isn't on a string?
			break;
	}
	
	//draw bow with rotation greatestAngle and pos
	
	moveBow(greatestAngle, mouseX, mouseY);
	
	//check for no movement
	if(prevMouseX == mouseX && prevMouseY == mouseY){
		if(mouseStability < MOUSE_STABLE){
			//not stable yet
			mouseStability++;
		}
		else{
			//is stable
			stopNote();
		}
	}
	else{
		mouseStability = 0;
		
		var violinString = ViolinString.getStringByID(stringNum);
		var pitch = violinString.getPitchByFinger(getMaxFinger());
		
		playNote(pitch);
		
		if(currentState == STATE_PLAY){
			//check for score
			var note = currentSong.getNote(currentPlayIndex);
			var correct = note.pitch;
			
			if(pitch == correct)
				songScore++;
		}
	}
	
	prevMouseX = mouseX;
	prevMouseY = mouseY;
}

function displayNotes(song){
	
	var note = song.getNote(currentDispIndex);
	
	if(currentDispIndex >= song.notes.length){
		return;
	}
	
	if(note.getPosition() - DISPLAY_TIME <= currentTime){
		//display note and prepare to display next
		animateNote(ViolinString.getStringByPitch(note.pitch) + 1, ViolinString.getFingerByPitch(note.pitch), note.getDuration() + DISPLAY_TIME, DISPLAY_TIME);
		currentDispIndex++;
	}
}

function playNotes(song){
	
	var note = song.getNote(currentPlayIndex);
	
	if(currentPlayIndex >= song.notes.length){
		return;
	}
	
	if(note.getPosition() <= currentTime){
		//play note and prepare to play next
		if(currentState != STATE_PLAY)
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
	
	currentTime = -DISPLAY_TIME;
	
	noteScore = 0;
	noteMax = 0;
	songScore = 0;
	songMax = 0;
}

function startSong(songName){
	var songData = getSongCode(songName);
	if(songData == "")
		return;
	
	currentDispIndex = 0;
	currentPlayIndex = 0;
	currentTime = 0;
	currentSong = new Song(songData);
	
}

/*

Flash functions:
playNote("pitch:duration");
setVolume("volume");
stopNote("");

*/
