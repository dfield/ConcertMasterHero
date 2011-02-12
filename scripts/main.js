
var TIME_STEP = 20;
//ms a note appears on screen before it is actually played
var DISPLAY_TIME = 4000;

STATE_WAIT = "WAIT";
STATE_PLAY = "PLAY";
STATE_DEMO = "DEMO";
STATE_RECORD = "RECORD";

//for recording songs
var currentRecord = "";
var currentRecordNote = null;
var num_records = 0;

//for playing
var currentState	= STATE_WAIT;
var currentTime		= 0;
var currentSong		= null;
var currentDispIndex = 0;
var currentPlayIndex = 0;

//for multiple listening
var currentSongs	= new Array();
var playIndices		= new Array();
var currentTimes	= new Array();

//for score counting
var songScore 	= 0;
var songMax 	= 0;

//if the player is still for 6 "frames," then the sounds stop
var MOUSE_STABLE = 6;
var mouseStability = 0;
var prevMouseX = 0;
var prevMouseY = 0;

setInterval(step, TIME_STEP);
function step(){
	stepSongPlayer();
	stepPlayerUI();
	
	currentTime += TIME_STEP;
	
	for(var a = 0; a < currentTimes.length; a++){
		currentTimes[a] += TIME_STEP;
	}
}

function stepSongPlayer(){
	//--------------Song Player--------------
	switch(currentState){
		case STATE_WAIT:
			//do nothing
			break;
			
		case STATE_DEMO:
			//use multilistener
			if(currentSongs.length == 0){
				setState(STATE_WAIT);
				break;
			}
			
			for(var a = 0; a < currentSongs.length; a++){
				playNotes(currentSongs[a], a);
				
				//check if this song is over
				if(currentTime >= currentSongs[a].getEndTime()){
					currentSongs.splice(a, 1);
					currentTimes.splice(a, 1);
					playIndices.splice(a, 1);
					a--;
				}
			}
			
			break;
			
		case STATE_PLAY:
			//use single-track player for play alongs
			if(!currentSong){
				setState(STATE_WAIT);
				break;
			}
			
			displayNotes(currentSong);
			
			//-1 signifies that the single-track player is being used
			playNotes(currentSong, -1);
			if(currentTime >= currentSong.getEndTime()){
				//end song and show score if song is over
				setState(STATE_WAIT);
				
				var board = document.getElementById("song_score");
				board.innerHTML = Math.ceil(songScore / songMax * 100);
			}
			
			break;
			
		case STATE_RECORD:
			//recording functionalities are within specialized event handlers
			
			break;
	}
	//------------End Song Player------------
}

function stepPlayerUI(){
	//for score counting
	if(currentState == STATE_PLAY && currentTime > 0){
		songMax++;
	}
	
	//no action if mouse is outside of play area
	if(mouseX > 800){
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
	
	//get the string the bow is resting on
	var stringNum = -1;
	for(var a = 0; a < 4; a++){
		if(greatestAngle == angles[a]){
			stringNum = a;
			break;
		}
	}
	
	//if stringNum = -1, then there is an error
	if(stringNum == -1)
		return;
	
	//draw bow with rotation greatestAngle and pos
	moveBow(greatestAngle, mouseX, mouseY);
	
	//check for no movement
	if(prevMouseX == mouseX && prevMouseY == mouseY){
		if(mouseStability < MOUSE_STABLE){
			//not stable yet
			mouseStability++;
		}
		else{
			//if recording, write down note since duration is known
			if(currentState == STATE_RECORD){
				writeRecordNote();
			}
			
			//player stopped moving, so stop sound
			stopNote();
		}
	}
	else{
		//player is moving the bow
		mouseStability = 0;
		
		//find pitch being played
		var violinString = ViolinString.getStringByID(stringNum);
		var pitch = violinString.getPitchByFinger(getMaxFinger());
		
		playNote(pitch);
		
		if(currentState == STATE_PLAY){
			
			//if playing along, check for score correctness
			var note = currentSong.getNote(currentPlayIndex);
			
			//if the right note is being played, then add to score
			if(note && pitch == note.pitch){
				songScore++;
			}
			
		}
		else if(currentState == STATE_RECORD){
			//currently recording
			
			if(!currentRecordNote){
				//if record note doesn't exist, create one
				createRecordNote(pitch);
			}
			else if(pitch == currentRecordNote.pitch){
				//if note is already being played, ignore; augment its duration onto the previous one
			}
			else{
				//if note changed, record previous and begin a new recording note
				writeRecordNote();
				createRecordNote(pitch);
			}
			
		}
	}
	
	//for testing whether the player stops moving
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

function playNotes(song, index){
	//single-track player info here
	var playIndex = currentPlayIndex;
	var time = currentTime;
	
	//if the multi-sound player is begin used, pull info from arrays
	if(index != -1){
		playIndex = playIndices[index];
		time = currentTimes[index];
	}
	
	var note = song.getNote(playIndex);
	
	if(playIndex >= song.notes.length){
		return;
	}
	
	if(note.getPosition() <= time){
		//play note and prepare to play next
		if(currentState != STATE_PLAY)
			playNote(note.pitch + ":" + note.getDuration());
		
		//add to correct sound player index
		if(index == -1)
			currentPlayIndex++;
		else
			playIndices[index]++;
	}
}

function demoSong(songName){
	setState(STATE_DEMO);
	startSong(songName);
}

function playSong(songName){
	setState(STATE_PLAY);
	
	currentPlayIndex = 0;
	currentTime = -DISPLAY_TIME;
	currentSong = new Song(getSongCode(songName));
	
	songScore = 0;
	songMax = 0;
}

function startSong(songName){
	var songData = getSongCode(songName);
	startSongCode(songData);
}

function startSongCode(songData){
	if(songData == "")
		return;
	
	currentDispIndex = 0;
	currentPlayIndex = 0;
	currentTime = 0;
	currentSong = new Song(songData);
	
	currentSongs.push(currentSong);
	currentTimes.push(0);
	playIndices.push(0);
}

function recordSong(){
	var recordToggle = document.getElementById("record_toggle");
	var records = document.getElementById("records");
	
	if(currentState == STATE_RECORD){
		//currently recording; stop recording
		recordToggle.innerHTML = "Click here to start recording.";
		
		if(currentRecordNote)
			writeRecordNote();
		
		records.innerHTML += "<a href='javascript: playRecording(\"" + currentRecord + "\")'>Record #" + num_records + "</a><br />";
		setState(STATE_WAIT);
		
	}
	else{
		recordToggle.innerHTML = "Click here to stop recording.";
		
		//start recording
		num_records++;
		
		currentRecord = "";
		currentRecordNote = null;
		currentTime = 0;
		setState(STATE_RECORD);
	}
	
}

function setState(state){
	currentState = state;
	if(currentState != STATE_DEMO){
		currentSongs = new Array();
		currentTimes = new Array();
		playIndices = new Array();
	}
	else{
		currentSong = null;
	}
}

function writeRecordNote(){
	if(!currentRecordNote)
		return;
	
	var duration = (currentTime - currentRecordNote.getPosition()) / currentRecordNote.TEMPO_SCALE;
	var position = currentRecordNote.getPosition() / currentRecordNote.TEMPO_SCALE;
	var pitch = currentRecordNote.pitch;
	
	currentRecord += position + "," + duration + "," + pitch + ";";
	
	currentRecordNote = null;
}

function createRecordNote(pitch){
	currentRecordNote = new Note(currentTime / (new Note()).TEMPO_SCALE, 0, pitch);
}

function playRecording(code){
	setState(STATE_DEMO);
	startSongCode(code);
}

/*

Flash functions:
playNote("pitch:duration");
setVolume("volume");
stopNote("");

*/
