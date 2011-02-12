function draw(){
	var paper = Raphael(0, 0, 500, 500);
<<<<<<< HEAD
	var triangle1 = paper.path("M 100 50 L 500 50 L 500 150 L 100 50");
	triangle1.attr("fill", "red");
	var triangle2 = paper.path("M 100 50 L 500 150 L 500 300 L 100 50");
	triangle2.attr("fill", "orange");
	var triangle2 = paper.path("M 100 50 L 500 300 L 400 400 L 100 50");
	triangle2.attr("fill", "yellow");
	var triangle2 = paper.path("M 100 50 L 400 400 L 300 400 L 100 50");
	triangle2.attr("fill", "blue");
=======
	var circle = paper.circle(125, 125, 75);
	var rod = paper.rect(10, 10, 50, 50);
	circle.attr("stroke", "#fff");
>>>>>>> 52421c204957343b9faf3ac38469139381e6995d
}

function Note (startTime, duration, pitch){
	this.startTime = start;
	this.duration = duration;
	this.pitch = pitch;
}