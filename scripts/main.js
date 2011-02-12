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
}

function Note (startTime, duration, pitch){
	this.startTime = start;
	this.duration = duration;
	this.pitch = pitch;
}