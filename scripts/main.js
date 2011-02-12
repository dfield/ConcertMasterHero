function draw(){
	var paper = Raphael(0, 0, 500, 500);
	
	var triangle1 = paper.path("M 100 50 L 500 50 L 500 150 L 100 50");
	triangle1.attr("fill", "red");
	var triangle2 = paper.path("M 100 50 L 500 150 L 500 300 L 100 50");
	triangle2.attr("fill", "orange");
	var triangle2 = paper.path("M 100 50 L 500 300 L 400 400 L 100 50");
	triangle2.attr("fill", "yellow");
	var triangle2 = paper.path("M 100 50 L 400 400 L 300 400 L 100 50");
	triangle2.attr("fill", "blue");
	
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
	
	var mouseX = 0;
	var mouseY = 0;
	var IE = document.all ? true : false;
	
	if (IE) { // grab the x-y pos.s if browser is IE
		mouseX = event.clientX + document.body.scrollLeft;
		mouseY = event.clientY + document.body.scrollTop;
	} else {  // grab the x-y pos.s if browser is NS
		mouseX = e.pageX;
		mouseY = e.pageY;
	}
	
	//match bow to strings
	var angles = new Array(4);
	for(var a = 0; a < 4; a++){
		var string = this["s" + a];
		angles[a] = Math.atan2(mouseY - string.y, mouseX - string.x);
		
	}
	greatest = Math.max(angles[0], angles[1], angles[2], angles[3]);
	
	var stringNum = -1;
	switch(greatest){
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
	
	var violinString = ViolinString.getStringByID(stringNum);
	var pitch = violinString.getPitchByFinger(getMaxFinger());
	
	playNote(pitch);
}

function displayNotes(song){
	
	var note = song.getNote(currentPlayIndex);
	
	if(note.getPosition() <= currentTime - DISPLAY_TIME){
		//display note and prepare to display next
		animateNote(ViolinString.getStringByPitch(note.pitch), note.pitch, note.getDuration(), DISPLAY_TIME);
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
