let value = 0;
let points = 0;
let counter = 1500;

let bgm;
let clink;

class Line {
	constructor() {
		//sets x and y coordinates of beginning and end points
		this.x1 = 550;
		this.y1 = 150;
		this.x2 = 650;
		this.y2 = 150;

		this.direction = true; //decides direction the line will move
		//if direction == true, then move right
		//if direction == false, then move left

	}

	move(change) {
		if (this.x2 > 900) { //if line has gone too far right
			this.direction = false;
		} else if (this.x1 < 0) { //if line has gone too far left
			this.direction = true;
		}

		if (this.direction === true) { 
			//if direction indicates to move right, add to x values so that the line moves towards right
			this.x1 += change;
			this.x2 += change;
		} else { 
			//if direction indicates to move left, minus to x values so that the line moves towards left
			this.x1 -= change;
			this.x2 -= change;
		}

	}

	display() {
		noFill();
		stroke(0);
		strokeWeight(3);

		//create the line
		line(this.x1, this.y1, this.x2, this.y2);
	}

} //end line class

class Player {
	constructor() {
		//triangle coordinates
		this.x1 = 600;
		this.y1 = 450;
		this.x2 = 580;
		this.y2 = 490;
		this.x3 = 620;
		this.y3 = 490;

		//circle coordinates
		this.cx = 600;
		this.cy = 150;
		this.diameter = 6;

	}

	moveMouse(change) {
		//move the mouse according to the key presses
		this.x1 += change;
		this.x2 += change;
		this.x3 += change;

	}

	moveDot(change) {
		//move the dot according to the key presses
		this.cx += change;

	}

	display() {
		stroke(0);
		fill(0);
		strokeWeight(1);

		//create the dot
		circle(this.cx, this.cy, this.diameter);
		//create the triangle
		triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);

	}

} //end player class

function preload() {
	bgm = loadSound('bgm.mp3');
	clink = loadSound('clink.mp3');
}

function setup() {
  	createCanvas(900,600);
  	background(0);

  	//load in background music and clink sfx
  	//bgm = createAudio('bgm.mp3');
  	//clink = createAudio('clink.mp3');

  	ai = new Line(); //initialize the line target
  	user = new Player();
  	bgm.play(); //play the audio while playing
}

function draw() {
	background(255);
	text("Score: ", 800, 60); //display score
	text(points, 850, 60);
	text("Time left: ", 650, 60); //display time left
	text(counter, 730, 60);
	if (counter > 0) { 
		//decrease counter aka time the user has left
		counter -= 1;
	}

	ai.display();
	if (counter != 0) {
		ai.move(10); //move the line across the screen only if there's time left
	} 

	user.display();

}

function keyPressed() {
	if (keyCode === LEFT_ARROW) { //decrease x value if press left
		value = -30;
		user.moveMouse(value);
		user.moveDot(value);
	} else if (keyCode === RIGHT_ARROW) { //increase x value if press right
		value = 30;
		user.moveMouse(value);
		user.moveDot(value);
	} else if (keyCode === UP_ARROW) {
		//game starts and dot is at the same level as the line
		//compares the dot's center value with the line's x values
		//if the dot is inbetween the line's x values, a point is rewarded for hitting the line
		//points can only be rewarded when there is time left on the counter
		if (user.cx >= ai.x1 && user.cx <= ai.x2 && counter != 0) {
			points += 1;
			clink.play(); //only hear clink sound when you have won a point
		}
	}
}