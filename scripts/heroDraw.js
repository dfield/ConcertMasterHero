function draw(){
	var paper = Raphael(0, 0, 800, 600);
	drawTriangles(paper);
	drawStrings(paper);
}

var BOW_LENGTH = 400;
var bow;

function moveBow(rotation, posX, posY){
	bow.setRotation(rotation);
	
	var points = bow.getPoints();
	/*var averagePoint = new Point(0, 0);
	
	for(var a = 0; a < points.length; a++){
		averagePoint.addPoint(points[a]);
	}
	
	averagePoint.scale(1 / points.length);
	averagePoint.addPoint()*/
	
	bow.setPosition(-posX, -posY);
}

function drawStrings(paper){
	bow = new Path(paper);
	bow.addPoint(-BOW_LENGTH / 2, 0);
	bow.addPoint(BOW_LENGTH / 2, 0);
	bow.makePath();
	bow.addStroke("black");
	
	string1 = new Path(paper);
	string1.addPoint(40,10);
	string1.addPoint(40,350);
	string1.makePath();
	string1.addStroke("blue");
	circle1 = new Circle(paper, 40, 350, 5);
	circle1.draw("blue", false);
	
	string2 = new Path(paper);
	string2.addPoint(70,10);
	string2.addPoint(95,320);
	string2.makePath();
	string2.addStroke("blue");
	circle2 = new Circle(paper, 95, 320, 5);
	circle2.draw("blue", false);
	
	string3 = new Path(paper);
	string3.addPoint(100, 10);
	string3.addPoint(160, 320);
	string3.makePath();
	string3.addStroke("blue");
	circle3 = new Circle(paper, 160, 320, 5);
	circle3.draw("blue", false);
	
	string4 = new Path(paper);
	string4.addPoint(130, 10);
	string4.addPoint(220, 350);
	string4.makePath();
	string4.addStroke("blue");
	circle4 = new Circle(paper, 220, 350, 5);
	circle4.draw("blue", false);
}

function drawTriangles(paper){
	triangle1 = new Path(paper);
	triangle1.addPoint(40,350);
	triangle1.addPoint(590,50);
	triangle1.addPoint(186,30);
	triangle1.addPoint(40,350);
	triangle1.makePath();
	triangle1.addStroke("black");
	triangle1.addFill("#FFC4C4");
	
	triangle2 = new Path(paper);
	triangle2.addPoint(95,320);
	triangle2.addPoint(715,320);
	triangle2.addPoint(590,50);
	triangle2.addPoint(95,320);
	triangle2.makePath();
	triangle2.addStroke("black");
	triangle2.addFill("#FFFEBD");
	
	triangle3 = new Path(paper);
	triangle3.addPoint(160,320);
	triangle3.addPoint(580,530);
	triangle3.addPoint(715,320);
	triangle3.addPoint(160,320);
	triangle3.makePath();
	triangle3.addStroke("black");
	triangle3.addFill("#C4FFC4");
	
	triangle4 = new Path(paper);
	triangle4.addPoint(220,350);
	triangle4.addPoint(580,530);
	triangle4.addPoint(260,530);
	triangle4.addPoint(220,350);
	triangle4.makePath();
	triangle4.addStroke("black");
	triangle4.addFill("#C4E8FF");
}

function animateNote(stringNumber, letter, noteLength, animationTime){
	// TODO: fill this in
}

function Circle (paper, x, y, r){
	this.paper = paper;
	this.xPos = x;
	this.yPos = y;
	this.radius = r;
	this.draw = function draw(color, fill){
		this.circle = drawCircle(this.paper, this.xPos, this.yPos, this.radius, color, fill);
	};
	this.drawText = function draw(text){
		this.drawnText = drawText(this.paper, this.xPos, this.yPos, text);
	};
	this.animate = function animateCircle(xPos, yPos, delay){
		this.circle.animate({cx: xPos, cy: yPos}, delay);
		this.drawnText.animateWith(this.circle, {x: xPos, y: yPos}, delay);
	};
	this.animateAlong = function animateCircleAlong(path, time){
		this.circle.animateAlong(path, time);
	};
	this.destroy = function destroy(time){
		if(this.circle != null){
			this.circle.remove();
		}
		if(this.drawnText != null){
			this.drawnText.remove();
		}
	};
}

function Path (paper){
	this.paper = paper;
	this.points = [];
	this.pathString = "";
	this.currPosition = new Point(0, 0);
	
	this.addPoint = function addPoint(x, y){
		this.points.push(new Point(x,y));
	};
	this.makePath = function makePath(){
		if(this.points.length != 0){
			this.pathString = "M";
			this.pathString = this.pathString + this.points[0].getX();
			this.pathString = this.pathString + " " + this.points[0].getY();
			for(var i=1; i < this.points.length; i++){
				this.pathString = this.pathString + "L";
				this.pathString = this.pathString + this.points[i].getX();
				this.pathString = this.pathString + " " + this.points[i].getY();
			}
			this.path = this.paper.path(this.pathString);
		}
	};
	this.addStroke = function addStroke(color){
		this.path.attr({stroke: color});
	};
	this.addFill = function addFill(color){
		this.path.attr({fill: color});
	};
	this.getPath = function getPath(){
		return this.path;
	};
	this.setRotation = function(angle){
		this.path.rotate(angle, true);
	};
	this.getPoints = function(){
		return this.points;
	};
	this.setPosition = function(px, py){
		this.path.translate(this.currPosition.getX() - px, this.currPosition.getY() - py);
		this.currPosition = new Point(px, py);
	};
}

function Point (x, y){
	this.xPos = x;
	this.yPos = y;
	this.getX = function(){
		return this.xPos;
	};
	this.getY = function(){
		return this.yPos;
	};
	this.addPoint = function(point){
		this.xPos += point.xPos;
		this.yPos += point.yPos;
	};
	this.scale = function(scalar){
		this.xPos *= scalar;
		this.yPos *= scalar;
	};
}

function drawCircle(paper, x, y, r, color, fill){
	var circle = paper.circle(x, y, r);
	if(fill){
		circle.attr("fill", color);
	}
	circle.attr({stroke: color});
	return circle;
}

function drawText(paper, x, y, text){
	var t = paper.text(x,y,text);
	return t;
}

function Note (startTime, duration, pitch){
	this.startTime = start;
	this.duration = duration;
	this.pitch = pitch;
}