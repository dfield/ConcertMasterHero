package hero{
	import flash.utils.getDefinitionByName;
	public class SoundSynth{
		//public static var notes:Array;
		//public static var notes = new Array("2G", "3A", "3B", "3C", "3D", "3E", "3FG", "3G", "4A", "4B", "4CD", "4D", "4E", "4FG", "4GA");
		public static var notes = new Array("2G", "2GA", "3A", "3AB", "3B", "3C", "3CD", "3D", "3DE", "3E", "3F", "3FG", "3G", "3GA", "4A", "4AB", "4B", "4C", "4CD", "4D", "4DE", "4E", "4F", "4FG", "4G", "4GA");
		
		static var sounds = new Array();
		static var a;
		for(a = 0; a < notes.length; a++){
			static var SndClass = getDefinitionByName("Note" + notes[a] + ".wav");
			static var snd = new SndClass();
			
			sounds.push(snd);
		}
		
		public static function getScale(arr){
			notes = arr;
		}
		public static function getSound(note:String){
			//return sounds[notes.indexOf(note)];
			var SndClass = getDefinitionByName("Note" + note + ".wav");
			var snd = new SndClass();
			return snd;
		}
	}
}