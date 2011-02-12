//---------------String Class---------------

var strings = new Array(4);
strings[0] = new ViolinString(40, 350, new Array("2G", "2GA", "3A", "3AB", "3B", "3C", "3CD"));
strings[1] = new ViolinString(95, 320, new Array("3D", "3DE", "3E", "3F", "3FG", "3G", "3GA"));
strings[2] = new ViolinString(160, 320, new Array("4A", "4AB", "4B", "4C", "4CD", "4D", "4DE"));
strings[3] = new ViolinString(220, 350, new Array("4E", "4F", "4FG", "4G", "4GA"));

function ViolinString(xPos, yPos, notes){
	this.x = xPos;
	this.y = yPos;
	this.notes = notes;
}

ViolinString.prototype.containsPitch = function (pitch){
	return this.notes.indexOf(pitch) != -1;
}

ViolinString.prototype.getPitchByFinger = function(finger){
	return this.notes[finger];
}

ViolinString.getStringByID = function(id){
	return strings[id];
}

ViolinString.getStringByPitch = function(pitch){
	for(var a = 0; a < 4; a++){
		if(strings[a].containsPitch(pitch))
			return a;
	}
	
	return -1;
}

//-------------End String Class-------------

//----------------Note Class----------------
function Note (position, duration, pitch){
	this.position	= position;
	this.duration	= duration;
	this.pitch		= pitch;
}

//the larger the number, the longer the note
//if TEMPO_SCALE = 1000, a note with duration 1 will last for 1000 ms
Note.prototype.TEMPO_SCALE = 500;

Note.prototype.getPosition = function(){
	return this.position * this.TEMPO_SCALE;
}

Note.prototype.getDuration = function(){
	return this.duration * this.TEMPO_SCALE;
}

//--------------End Note Class--------------

//----------------Song Class----------------
function Song(songCode){
	this.notes = new Array();
	this.parseData(songCode);
}

Song.prototype.parseData = function(songCode){
	var noteCodes = songCode.split(";");
	
	for(var a = 0; a < noteCodes.length; a++){
		if(noteCodes[a] == ""){
			continue;
		}
		
		var attrCodes = noteCodes[a].split(",");
		
		this.notes.push(new Note(attrCodes[0], attrCodes[1], attrCodes[2]));
		/*positions.push(attrCodes[0]);
		durations.push(attrCodes[1]);
		notePitch.push(attrCodes[2]);*/
	}
}

Song.prototype.getNote = function(index){
	if(index >= this.notes.length)
		return null;
	
	return this.notes[index];
}
//--------------End Song Class--------------

function getSongCode(songName){
	switch(songName){
		case "Tutorial":
			return "0,3,3D;3,3,3D;6,3,4A;9,3,3D;12,3,3E;15,3,3FG;18,3,3G";
			break;
			
		case "Twinkle Twinkle Little Star":
			return "0,2,3D;2,2,3D;4,2,4A;6,2,4A;8,2,4B;10,2,4B;12,4,4A;16,2,3G;18,2,3G;20,2,3FG;22,2,3FG;24,2,3E;26,2,3E;28,4,3D;32,2,4A;34,2,4A;36,2,3G;38,2,3G;40,2,3FG;42,2,3FG;44,4,3E;48,2,4A;50,2,4A;52,2,3G;54,2,3G;56,2,3FG;58,2,3FG;60,4,3E;64,2,3D;66,2,3D;68,2,4A;70,2,4A;72,2,4B;74,2,4B;76,4,4A;80,2,3G;82,2,3G;84,2,3FG;86,2,3FG;88,2,3E;90,2,3E;92,4,3D";
			break;
			
		case "Humoresque":
			return "0,3,3D;3,1,3E;4,3,3D;7,1,3E;8,3,3FG;11,1,4A;12,3,4B;15,1,4A;16,3,4D;19,1,4CD;20,3,4E;23,1,4D;24,3,4CD;27,1,4E;28,3,4D;31,1,4B;32,3,4A;35,1,4A;36,3,4B;39,1,4A;40,3,4D;43,1,4B;44,3,4A;47,1,3FG;48,8,3E;";
			break;
			
		case "Allstar":
			return "0,2,3D;2,1,4A;3,1,3FG;4,1,3FG;5,1,3E;6,1,3D;7,2,3G;9,1,3G;10,1,3FG;11,1,3E;12,1,3E;13,2,3D;15,1,3D;16,1,4A;17,1,3FG;18,1,3FG;19,1,3E;20,1,3E;21,1,3D;22,1,3E;23,2,3FG;25,2,3B";
			break;
			
		default:
			return "";
	}
}