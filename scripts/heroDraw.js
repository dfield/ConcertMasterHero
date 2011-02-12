function draw(){
	paper = Raphael(0, 0, 800, 600);
	drawTriangles(paper);
	drawLetters(paper);
	drawStrings(paper);
}

var BOW_LENGTH = 800;
var bow;

function moveBow(rotation, posX, posY){
	bow.setRotation(rotation);
	bow.setPosition(-posX, -posY);
}

function drawLetters(paper){
	var t1 = drawText(paper, 272, 143, "G");
	t1.attr({"font-size": "40"});
	var t2 = drawText(paper, 466, 230, "D");
	t2.attr({"font-size": "40"});
	var t3 = drawText(paper, 485, 390, "A");
	t3.attr({"font-size": "40"});
	var t4 = drawText(paper, 353, 470, "E");
	t4.attr({"font-size": "40"});
}

function drawStrings(paper){
	bow = new Path(paper);
	bow.addPoint(-BOW_LENGTH / 2, 0);
	bow.addPoint(BOW_LENGTH / 2, 0);
	bow.addPoint(BOW_LENGTH / 2, -12);
	bow.addPoint(-BOW_LENGTH / 2, -12);
	bow.addPoint(-BOW_LENGTH / 2, 0);
	bow.makePath();
	bow.addStroke("black");
	bow.addFill("brown");
	
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
	var note = new Circle(paper, 10 + 30*stringNumber, 10, 12);
	note.draw("yellow", true);
	note.drawText(letter);
	note.increaseFont();
	switch(stringNumber){
		case 1:
			note.animate(40, 350, animationTime);
			break;
		case 2:
			note.animate(95, 320, animationTime);
			break;
		case 3:
			note.animate(160, 320, animationTime);
			break;
		case 4:
			note.animate(220, 350, animationTime);
			break;
	}
	setTimeout(note.destroy, noteLength);
}

function Circle (paper, x, y, r){
	var self = {};
	self.paper = paper;
	self.xPos = x;
	self.yPos = y;
	self.radius = r;
	self.draw = function draw(color, fill){
		self.circle = drawCircle(self.paper, self.xPos, self.yPos, self.radius, color, fill);
	};
	self.drawText = function draw(text){
		self.drawnText = drawText(self.paper, self.xPos, self.yPos, text);
	};
	self.increaseFont = function font(){
		self.drawnText.attr({"font-size": "20"});
	};
	self.animate = function animateCircle(xPos, yPos, delay){
		self.circle.animate({cx: xPos, cy: yPos}, delay);
		self.drawnText.animateWith(self.circle, {x: xPos, y: yPos}, delay);
	};
	self.animateAlong = function animateCircleAlong(path, time){
		self.circle.animateAlong(path, time);
	};
	self.destroy = function destroy(){
		if(self.circle != null){
			self.circle.remove();
		}
		if(self.drawnText != null){
			self.drawnText.remove();
		}
	};
	
	return self;
}

function Path (paper){
	var self = {};
	
	self.paper = paper;
	self.points = [];
	self.pathString = "";
	self.currPosition = new Point(0, 0);
	
	self.addPoint = function addPoint(x, y){
		self.points.push(new Point(x,y));
	};
	self.makePath = function makePath(){
		if(self.points.length != 0){
			self.pathString = "M";
			self.pathString = self.pathString + self.points[0].getX();
			self.pathString = self.pathString + " " + self.points[0].getY();
			for(var i=1; i < self.points.length; i++){
				self.pathString = self.pathString + "L";
				self.pathString = self.pathString + self.points[i].getX();
				self.pathString = self.pathString + " " + self.points[i].getY();
			}
			self.path = self.paper.path(self.pathString);
		}
	};
	self.addStroke = function addStroke(color){
		self.path.attr({stroke: color});
	};
	self.addFill = function addFill(color){
		self.path.attr({fill: color});
	};
	self.getPath = function getPath(){
		return self.path;
	};
	self.setRotation = function(angle){
		self.path.rotate(angle, true);
	};
	self.setPosition = function(px, py){
		self.path.translate(self.currPosition.getX() - px, self.currPosition.getY() - py);
		self.currPosition = new Point(px, py);
	};
	return self;
}

function Point (x, y){
	var self = {};
	
	self.xPos = x;
	self.yPos = y;
	self.getX = function(){
		return self.xPos;
	};
	self.getY = function(){
		return self.yPos;
	};
	self.addPoint = function(point){
		self.xPos += point.xPos;
		self.yPos += point.yPos;
	};
	self.scale = function(scalar){
		self.xPos *= scalar;
		self.yPos *= scalar;
	};
	
	return self;
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