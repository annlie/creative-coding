let points = 0;
let check = false; //checks if a bomb has been clicked on
let win = false;
let bombWarning = false; //checks if an item has a bomb on its left or right side
let screen = "menu"; //checks if we're on the menu screen or not
let musicSetting = false; //checks if music has been turned off in settings

let bgm;
let point;
let lose;

class Items {
	constructor(name, x, y, check) {
		this.picture = loadImage(name);//the display image
		this.reveal = false;//show card or image
		this.color = color(255, 204, 204); //cover color until image is clicked on
		this.x = x; //x coordinate where image will be displayed
		this.y = y; //y coordinate where image will be displayed
		this.bomb = check; //if it is a bomb or not
		this.clicked = false; //if it has been clicked on already or not
	}

	display() {
		//shows square if item hasnt been clicked on yet
		if (this.reveal == false) {
			fill(255, 204, 204);
			square(this.x, this.y, 100);
		} else {
			//shows image if clicked on
			image(this.picture, this.x, this.y);
		}
	}

} //end items class


function preload() {
	bgm = loadSound("bgm.mp3");
	point = loadSound("point.mp3");
	lose = loadSound("lose.mp3");
}

function setup() {
  	createCanvas(1000,600);
  	background(255, 204, 204);
  	basket = loadImage("/basket.png");
  	home = loadImage("home.png");

  	settings = loadImage("settings.png");
  	play = loadImage("play.png");
  	rules = loadImage("rules.png");
  	title = loadImage("title.png");

  	
  	//first row of cards
  	sb = new Items("strawberry.png", 100, 100, false);
  	ap = new Items("apple.png", 200, 100, false);
  	ba = new Items("banana.png", 300, 100, false);
  	bomb1 = new Items("bomb.png", 400, 100, true);
  	ch = new Items("cherry.png", 500, 100, false);

  	//second row of cards
  	bomb2 = new Items("bomb.png", 100, 200, true);
  	gr = new Items("grape.png", 200, 200, false);
  	or = new Items("orange.png", 300, 200, false);
  	pc = new Items("peach.png", 400, 200, false);
  	bomb3 = new Items("bomb.png", 500, 200, true);

  	//third row of cards
  	kw = new Items("kiwi.png", 100, 300, false);
  	pa = new Items("pineapple.png", 200, 300, false);
  	bomb4 = new Items("bomb.png", 300, 300, true);
  	sb2 = new Items("strawberry.png", 400, 300, false);
  	pc2 = new Items("peach.png", 500, 300, false);

  	//fourth row of cards
  	bomb5 = new Items("bomb.png", 100, 400, true);
  	ch2 = new Items("cherry.png", 200, 400, false);
  	or2 = new Items("orange.png", 300, 400, false);
  	ap2 = new Items("apple.png", 400, 400, false);
  	kw2 = new Items("kiwi.png", 500, 400, false);
	 
	bgm.play();
}

function draw() {
	background(255, 204, 204);

	if (screen == "menu") {
		image(title, 320, 150);
		image(play, 380, 250);
		image(rules, 362, 320);
		image(settings, 325, 390);

		//to find bounding box for "buttons"
		// stroke(255);
		// noFill();
		// strokeWeight(1);
		// rect(370, 235, 250, 70);
		// rect(352, 305, 285, 70);
		// rect(315, 375, 375, 70);
	}

	if (screen == "rules") {
		image(rules, 150, 150);
		fill(255);
		stroke(255);
		textSize(20);
		strokeWeight(1);
		text("Find the fruit you need for your picnic by clicking on each square. Be careful to avoid the bombs! Clicking on a bomb will end the game. To restart the game, press enter after winning or losing.", 228, 230, 400, 200);
		textSize(15);
		text("Go back home", 228, 400);
		//to find bounding box for go back home "button"
		//rect(225, 380, 120, 30);
	}

	if (screen == "settings") {
		image(settings, 150, 150);
		strokeWeight(1);
		textSize(20);
		text("Turn off music", 228, 250);
		if (musicSetting == false) {
			fill(255);
			stroke(255);
		} else {
			fill(255, 153, 153);
			stroke(255, 153, 153);
		}
		text("✔", 365, 250);
		//to find bounding box for "button"
		//rect(213, 228, 180, 30);

		fill(255);
		stroke(255);
		textSize(15);
		text("Go back home", 228, 300);
	}

	if (screen == "play") {
		stroke(255); //white stroke
	  	strokeWeight(3);
	  	//drawing the box for all the cards:
	  	line(100,100,600,100);
	  	line(100,500,600,500);
	  	line(100,100, 100,500);
	  	line(600,100, 600,500);
	  	//drawing the lines to separate the cards:
	  	line(200,100, 200,500);
	  	line(300,100, 300,500);
	  	line(400,100, 400,500);
	  	line(500,100, 500,500);

	  	line(100,200, 600, 200);
	  	line(100,300, 600, 300);
	  	line(100,400, 600, 400);

		image(basket, 630+50, 285);
		image(home, 970, 570);

		fill(255); //white fill
	  	strokeWeight(1);
	  	textSize(20);
	  	text("SCORE:", 630+50, 480);

	  	text("Avoid the bombs!", 630+90, 140);
	  	text("Find the fruit!", 630+110, 170);
	  	text("🍓🍑🍌🍊🍉", 630+116, 200);
	  	text(points, 630+150, 480);

	  	//display all cards
		sb.display();
		ap.display();
		ba.display();
		bomb1.display();
		ch.display();

		bomb2.display();
		gr.display();
		or.display();
		pc.display();
		bomb3.display();

		kw.display();
	  	pa.display();
	  	bomb4.display();
	  	sb2.display();
	  	pc2.display();

	  	bomb5.display();
	  	ch2.display();
	  	or2.display();
	  	ap2.display();
	  	kw2.display();

	  	if (bombWarning == true) { //prints out a warning if there is a bomb nearby
	  		warning();
	  	} else { 
	  		//covers any bomb warnings that were previously there if there is no bomb nearby
	  		safe();
	  	}

	  	if(check == true) {
	  		//screen for when you lose
	  		textSize(90);
	  		noStroke();
	  		fill(255);
	  		rect(190, 235, 600, 120);
	  		fill(255, 153, 153);
	  		text("GAME OVER", 220, 330);
	  		textSize(20);
	  		fill(255);
	  		text("Want to play again? Press enter!", 360, 570);
	  	} else if (win == true) {
	  		//screen for when you win
	  		textSize(90);
	  		noStroke();
	  		fill(255, 153, 153);
	  		background(255, 204, 204);
	  		text("Congrats! You won!", 90, 310);
	  		textSize(50);
	  		text("Enjoy your picnic!", 300, 380);
	  		textSize(20);
	  		fill(255);
	  		text("Want to play again? Press enter!", 360, 570);
	  	}
	}
}

function reset() { 
	// to reset game once user indicates the game should be reset
	sb.reveal = false;
	ap.reveal = false;
	ba.reveal = false;
	bomb1.reveal = false;
	ch.reveal = false;
	bomb2.reveal = false;
	gr.reveal = false;
	or.reveal = false;
	pc.reveal = false;
	bomb3.reveal = false;
	kw.reveal = false;
	pa.reveal = false;
	bomb4.reveal = false;
	sb2.reveal = false;
	pc2.reveal = false;
	bomb5.reveal = false;
	ch2.reveal = false;
	or2.reveal = false;
	ap2.reveal = false;
	kw2.reveal = false;
	points = 0;
	check = false;
	win = false;
}

function warning() { 
	//displays a message if there is a bomb nearby
	fill(255,0,0); //red
	noStroke();
	textSize(15);
	text("WARNING: a bomb is nearby!", 630+70, 250);
}

function safe() { 
	//displays a box that matches the background color if there is no bomb nearby aka covers any bomb messages previously there
	fill(255, 204, 204);
	noStroke();
	rect(680, 240, 100, 40);
}

function mousePressed() {

	if (screen == "menu") {
		//change the screen based off of which screen is clicked
		if (mouseX > 370 && mouseX < 620 && mouseY > 235 && mouseY < 305) {
			screen = "play";
		} else if (mouseX > 352 && mouseX < 637 && mouseY > 305 && mouseY < 375) {
			screen = "rules";
		} else if (mouseX > 315 && mouseX < 690 && mouseY > 375 && mouseY < 445) {
			screen = "settings";
		}
	}

	else if (screen == "rules") {
		if (mouseX > 225 && mouseX < 345 && mouseY > 380 && mouseY < 410) {
			screen = "menu";
			//go back to menu screen
		}
	}

	else if (screen == "settings") {
		if (mouseX > 213 && mouseX < 393 && mouseY > 228 && mouseY < 258) {
			musicSetting = !musicSetting; //flips the music setting color
			
			if (musicSetting == true) { //turn music off
				bgm.stop();
			} else {
				bgm.play(); //play music
			}
		}

		if (mouseX > 225 && mouseX < 345 && mouseY > 280 && mouseY < 310) {
			screen = "menu";
			//go back to menu screen
		}
	}

	else if (screen == "play") {
		if (mouseX > 960 && mouseY > 570) {
			screen = "menu"; //go back to menu screen
		}

		if (mouseX > 100 && mouseX < 200 && mouseY > 100 && mouseY < 200 && check == false && win != true && sb.reveal != true) {
			sb.reveal = true;
			points += 1;
			point.play(); //hear when u click on a fruit and win a point
			bombWarning = false;
		} else if (mouseX > 200 && mouseX < 300 && mouseY > 100 && mouseY < 200 && check == false && win != true && ap.reveal != true) {
			ap.reveal = true;
			points += 1;
			point.play(); //hear when u click on a fruit and win a point
			bombWarning = false;
		} else if (mouseX > 300 && mouseX < 400 && mouseY > 100 && mouseY < 200 && check == false && win != true && ba.reveal != true) {
			ba.reveal = true;
			points += 1;
			point.play(); //hear when u click on a fruit and win a point
			bombWarning = true;
		} else if (mouseX > 400 && mouseX < 500 && mouseY > 100 && mouseY < 200 && check == false && win != true) {
			bomb1.reveal = true;
			check = true;
			lose.play(); //hear when you click on a bomb and lose the game
		} else if (mouseX > 500 && mouseX < 600 && mouseY > 100 && mouseY < 200 && check == false && win != true && ch.reveal != true) {
			ch.reveal = true;
			points += 1;
			point.play(); //hear when u click on a fruit and win a point
			bombWarning = true;
		} 


		else if (mouseX > 100 && mouseX < 200 && mouseY > 200 && mouseY < 300 && check == false && win != true) {
			bomb2.reveal = true;
			check = true;
			lose.play(); //hear when you click on a bomb and lose the game
		} else if (mouseX > 200 && mouseX < 300 && mouseY > 200 && mouseY < 300 && check == false && win != true && gr.reveal != true) {
			gr.reveal = true;
			points += 1;
			point.play(); //hear when u click on a fruit and win a point
			bombWarning = true;
		} else if (mouseX > 300 && mouseX < 400 && mouseY > 200 && mouseY < 300 && check == false && win != true && or.reveal != true) {
			or.reveal = true;
			points += 1;
			point.play(); //hear when u click on a fruit and win a point
			bombWarning = false;
		} else if (mouseX > 400 && mouseX < 500 && mouseY > 200 && mouseY < 300 && check == false && win != true && pc.reveal != true) {
			pc.reveal = true;
			points += 1;
			point.play(); //hear when u click on a fruit and win a point
			bombWarning = true;
		} else if (mouseX > 500 && mouseX < 600 && mouseY > 200 && mouseY < 300 && check == false && win != true) {
			bomb3.reveal = true;
			check = true;
			lose.play(); //hear when you click on a bomb and lose the game
		} 

		else if (mouseX > 100 && mouseX < 200 && mouseY > 300 && mouseY < 400 && check == false && win != true && kw.reveal != true) {
			kw.reveal = true;
			points += 1;
			point.play(); //hear when u click on a fruit and win a point
			bombWarning = false;
		} else if (mouseX > 200 && mouseX < 300 && mouseY > 300 && mouseY < 400 && check == false && win != true && pa.reveal != true) {
			pa.reveal = true;
			points += 1;
			point.play(); //hear when u click on a fruit and win a point
			bombWarning = true;
		} else if (mouseX > 300 && mouseX < 400 && mouseY > 300 && mouseY < 400 && check == false && win != true) {
			bomb4.reveal = true;
			check = true;
			lose.play(); //hear when you click on a bomb and lose the game
		} else if (mouseX > 400 && mouseX < 500 && mouseY > 300 && mouseY < 400 && check == false && win != true && sb2.reveal != true) {
			sb2.reveal = true;
			points += 1;
			point.play(); //hear when u click on a fruit and win a point
			bombWarning = true;
		} else if (mouseX > 500 && mouseX < 600 && mouseY > 300 && mouseY < 400 && check == false && win != true && pc2.reveal != true) {
			pc2.reveal = true;
			points += 1;
			point.play(); //hear when u click on a fruit and win a point
			bombWarning = false;
		} 

		else if (mouseX > 100 && mouseX < 200 && mouseY > 400 && mouseY < 500 && check == false && win != true) {
			bomb5.reveal = true;
			check = true;
			lose.play(); //hear when you click on a bomb and lose the game
		} else if (mouseX > 200 && mouseX < 300 && mouseY > 400 && mouseY < 500 && check == false && win != true && ch2.reveal != true) {
			ch2.reveal = true;
			points += 1;
			point.play(); //hear when u click on a fruit and win a point
			bombWarning = true;
		} else if (mouseX > 300 && mouseX < 400 && mouseY > 400 && mouseY < 500 && check == false && win != true && or2.reveal != true) {
			or2.reveal = true;
			points += 1;
			point.play(); //hear when u click on a fruit and win a point
			bombWarning = false;
		} else if (mouseX > 400 && mouseX < 500 && mouseY > 400 && mouseY < 500 && check == false && win != true && ap2.reveal != true) {
			ap2.reveal = true;
			points += 1;
			point.play(); //hear when u click on a fruit and win a point
			bombWarning = false;
		} else if (mouseX > 500 && mouseX < 600 && mouseY > 400 && mouseY < 500 && check == false && win != true && kw2.reveal != true) {
			kw2.reveal = true;
			points += 1;
			point.play(); //hear when u click on a fruit and win a point
			bombWarning = false;
		} 

		//reveal all bombs once game is over aka when check equals true bc u clicked on a bomb
		if (check == true) {
			bomb1.reveal = true;
			bomb2.reveal = true;
			bomb3.reveal = true;
			bomb4.reveal = true;
			bomb5.reveal = true;
		}

		//check if we've won the game by checking if each fruit is revealed and no bombs are revealed
		if (sb.reveal == true && ap.reveal == true && ba.reveal == true && ch.reveal == true &&
			gr.reveal == true && or.reveal == true && pc.reveal == true && kw.reveal == true &&
			pa.reveal == true && sb2.reveal == true && pc2.reveal == true && ch2.reveal == true &&
			or2.reveal == true && ap2.reveal == true && kw2.reveal == true && check == false) {
			win = true;
		}
	}
}

function keyPressed() {
	if (keyCode == ENTER) {
		//if enter key is pressed, reset the game
		reset(); 
	}
}