$(document).ready(function() {
	// STOP WATCH

	var timeBox = $("#currentTime");
	var clock = setInterval(updateClock, 1000);
	var clockTime = 0;
	function updateClock(){
		clockTime += 1; 
		render();
	};
	function render(){
		timeBox.text(clockTime+"s");
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
				player.x -= 10;		
			}
			if(player.x <= 10){
				gameOver(game);
			}
		}
		if(key===38){
			if(player.y > 0){
				player.y -= 5;
			}
			if(player.y <= 5){
				gameOver(game);
			}
		}
		if(key===39){
			if(player.x < 285){
				player.x += 10;
			}
			if(player.x >= 280){
				gameOver(game);
			}
		}
		if(key===40){
			if(player.y < 145){
				player.y += 5;
			}
			if(player.y >=140){
				gameOver(game);
			}

		}
		var dX = player.x - enemy.x;
		var dY = player.y - enemy.y;
		
		var distance = Math.sqrt((dX*dX)+(dY*dY));
		if(distance>0){
			enemy.x += (player.x-enemy.x)/enemy.speed;
			enemy.y += (player.y-enemy.y)/enemy.speed;
		}
		if(distance<8.25){
			gameOver(game);
		}
		
		if(clockTime === 10){

			enemy.speed = 15;
		}
		if(clockTime === 20){
			enemy.speed = 12;
		}
		if(clockTime === 30){
			enemy.speed = 9;
		}
		if(clockTime === 45){
			enemy.speed = 5;
		}
		if(clockTime === 60){
			enemy.speed = 3;
		}

	};
	function draw(){
		canvas.clearRect(0,0, canvasWidth, canvasHeight);
		board.draw();
		player.draw();
		enemy.draw();
	};

	function gameOver(game){

		saveResults(endResults());
		clearInterval(game);
		clearInterval(clock);
	}

	function saveResults(data){
		var request = $.ajax({
			method: "POST",
			url: "/play",
			data: data,
			contentType: "application/json",
		});
		request.done(function(response){
			$(".game").append(response);
		});

	};

	function endResults() {
		return JSON.stringify({survived_time: clockTime});
	};
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
		},
		speed: 18

	};

	var board = {
		x:10,
		y:5,
		bWidth: 280,
		bHeight: 140,
		draw: function(){
			canvas.fillStyle = "#FFFFFF";
			canvas.fillRect(this.x,this.y, this.bWidth, this.bHeight);
		},
	};
});
