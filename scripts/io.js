
//fingering: gfdsa
var fingers = new Array(103, 102, 100, 115, 97);
var pressed = new Array();
var currentFinger = 0;

document.onkeydown = function(e){
	var finger = fingers.indexOf(e.keyCode) + 1;
	
	//if a correct finger is actually pressed, record it
	if(finger > 0)
		pressed.push(finger);
}

document.onkeyup = function(e){
	var finger = fingers.indexOf(e.keyCode) + 1;
	
	//if a correct finger is actually pressed, record it
	if(finger > 0)
		pressed.splice(pressed.indexOf(finger), 1);
}

function getMaxFinger(){
	var maxFinger = 0;
	for(var a = 0; a < pressed.length; a++){
		maxFinger = Math.max(pressed[a], maxFinger);
	}
	
	return maxFinger;
}

//------------get mouse position------------
var mouseX = 0;
var mouseY = 0;

document.onmousemove = getMousePosition;

var IE = document.all ? true : false;
function getMousePosition(e){
	if (IE) { // grab the x-y pos.s if browser is IE
		mouseX = event.clientX + document.body.scrollLeft;
		mouseY = event.clientY + document.body.scrollTop;
	}
	else {  // grab the x-y pos.s if browser is NS
		mouseX = e.pageX;
		mouseY = e.pageY;
	}
	if (mouseX < 0){mouseX = 0;}
	if (mouseY < 0){mouseY = 0;}
	
}
//----------end get mouse position----------