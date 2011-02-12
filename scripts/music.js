
function Note (startTime, duration, pitch){
	this.startTime = start;
	this.duration = duration;
	this.pitch = pitch;
}

function Song(data){
	
}
Song.prototype.loadData = function(data){
	
}

function getSongText(songName){
	switch(songName){
		case "Twinkle":
			return new Song("0,2,3D;2,2,3D;4,2,4A;6,2,4A;8,2,4B;10,2,4B;12,4,4A;16,2,3G;18,2,3G;20,2,3FG;22,2,3FG;24,2,3E;26,2,3E;28,4,3D;32,2,4A;34,2,4A;36,2,3G;38,2,3G;40,2,3FG;42,2,3FG;44,4,3E;48,2,4A;50,2,4A;52,2,3G;54,2,3G;56,2,3FG;58,2,3FG;60,4,3E;64,2,3D;66,2,3D;68,2,4A;70,2,4A;72,2,4B;74,2,4B;76,4,4A;80,2,3G;82,2,3G;84,2,3FG;86,2,3FG;88,2,3E;90,2,3E;92,4,3D");
			break;
		case "Humoresque":
			return new Song("0,3,3D;3,1,3E;4,3,3D;7,1,3E;8,3,3FG;11,1,4A;12,3,4B;15,1,4A;16,3,4D;19,1,4CD;20,3,4E;23,1,4D;24,3,4CD;27,1,4E;28,3,4D;31,1,4B;32,3,4A;35,1,4A;36,3,4B;39,1,4A;40,3,4D;43,1,4B;44,3,4A;47,1,3FG;48,8,3E;");
			break;
		case "Allstar":
			return new Song("0,2,3D;2,1,4A;3,1,3FG;4,1,3FG;5,1,3E;6,1,3D;7,2,3G;9,1,3G;10,1,3FG;11,1,3E;12,1,3E;13,2,3D;15,1,3D;16,1,4A;17,1,3FG;18,1,3FG;19,1,3E;20,1,3E;21,1,3D;22,1,3E;23,2,3FG;25,2,3B");
			break;
	}
}