function draw(){
	var paper = Raphael(0, 0, 500, 500);
	var circle = paper.circle(125, 125, 75);
	circle.attr("fill", "#f00");
	circle.attr("stroke", "#fff");
}

function Note (startTime, duration, pitch){
	this.startTime = start;
	this.duration = duration;
	this.pitch = pitch;
}