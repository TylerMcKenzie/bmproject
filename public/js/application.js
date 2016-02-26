$(document).ready(function() {
	// STOP WATCH

	var timeBox = $("#currentTime");
	setInterval(updateClock);
	var clock;
	var offset;
	function updateClock(){
		clock += diff(); 
		render();
	};
	function diff(){
		var now = Date.now();
		var diff = now - offset;
		offset = now;
		return diff;
	};
	function render(){
		timeBox.text(clock/1000);
	};



	// GAME DATA

 	var canvas = $("#gameCanvas").get(0).getContext("2d");
 	var canvasWidth = $("#gameCanvas").width();
 	var canvasHeight = $("#gameCanvas").height();
	var FPS = 30;

	var game = setInterval(function() {
	  update();
	  draw();
	}, 1000/FPS);


	var key;
	$(document).on("keydown", function(){
		event.preventDefault();
		key = event.keyCode;
	});

	function update(){
		if(key===37){
			if(player.x > 0){
				player.x -= 8;		
			}
		}
		if(key===38){
			if(player.y > 0){
				player.y -= 5;
			}
		}
		if(key===39){
			if(player.x < 285){
				player.x += 8;
			}
		}
		if(key===40){
			if(player.y < 145){
				player.y += 5;
			}
		}
		
		var dX = player.x - enemy.x;
		var dY = player.y - enemy.y;
		var distance = Math.sqrt((dX*dX)+(dY*dY));
		if(distance>0){
			enemy.x += (player.x-enemy.x)/18;
			enemy.y += (player.y-enemy.y)/18;
		}
		if(distance<8.5){
			alert("you died");
			gameOver(game);
		}
		
	};
	function draw(){
		canvas.clearRect(0,0, canvasWidth, canvasHeight);
		board.draw();
		player.draw();
		enemy.draw();
	};
	function gameOver(game){
		clearInterval(game);

	}
	var player = {
		color: "#00A",
		x: 20,
		y: 20,
		width: 10,
		height: 5,
		draw: function(){
			canvas.fillStyle = this.color;
			canvas.fillRect(this.x, this.y, this.width, this.height);
		},
		
	};
	
	var enemy = {
		color: "#000",
		x: 200,
		y: 100,
		width: 16,
		height: 8,
		draw: function(){
			canvas.fillStyle = this.color;
			canvas.fillRect(this.x,this.y,this.width,this.height);
		}

	};

	var board = {
		draw: function(){
			canvas.fillStyle = "#FFFFFF";
			canvas.fillRect(10,5, 280, 140);
		}
	};


});
