 window.addEventListener("load", ()=>{	
	//variable definiton 
	var board;
	const canvas = document.querySelector("#canvas");
	const context = canvas.getContext("2d"); 	
	var ai_shape = "";
	var cc = 0;
	var pp = 0;
	var spotss = 0;
	var i = 0;
	var lines = 0;
	var drawX = []
	var drawY = []
	var positionArrayX = [];
	var board = [];
	var positionArrayY = [];
	var minX;
	var maxX;
	var minY;
	var maxY;
	var shape_drawn = "";
	var shape_ai = "";
	var score = 0;
	var comp_use = false;
	//win states
	const combo = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
	]
	
	//array given values to signify positions on the board
	board = Array.from(Array(9).keys());
	
	//setting canvas properties 
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	context.fillRect(475,10,10,600);
	context.fillRect(700,10,10,600);
	context.fillRect(300,200,600,10);
	context.fillRect(300,400,600,10);

	//creating clear button
	const path = new Path2D()
	path.rect(25,72,100,50);
	path.closePath();
	context.font = "20px Arial";
	context.fillText("Clear",45,100,100,50);
	context.fillStyle = "#FFFFFF"
	context.fillStyle = "rgba(225,225,225,0.5)"
	context.fill(path)
	context.lineWidth = 2
	context.strokeStyle = "#000000"
	context.stroke(path)

	//creating done button
	const path2 = new Path2D()
	path2.rect(25,150,100,50);
	path2.closePath();
	context.font = "20px Arial";
	context.fillStyle = "#000000"
	context.fillText("Done",50,182,100,50);
	context.fillStyle = "#FFFFFF"
	context.fillStyle = "rgba(225,225,225,0.5)"
	context.fill(path2)
	context.lineWidth = 2
	context.strokeStyle = "#000000"
	context.stroke(path2)
	
	//	Whether the user is painting or not is tracked to know when to stop 
	//	drawing and start a new line 
	let painting = false;

	//function for the placement of the button 
	function get_XY(canvas, event){
	  const rect = canvas.getBoundingClientRect()
	  const y = event.clientY - rect.top
	  const x = event.clientX - rect.left
	  return {x:x, y:y}
	}

	//listens for the button click
	canvas.addEventListener("click",  function (e) {
	  //stops drawing on the button 
	  painting = false;
	  const XY = get_XY(canvas, e)
	  // if button at location is clicked perform clear operation
	  if(context.isPointInPath(path, XY.x, XY.y)) {
		cc = 0;
		context.clearRect(0, 0, canvas.width, canvas.height);
		
		//	Dynamic sizing based on window size
		canvas.height = window.innerHeight+150;
		canvas.width = window.innerWidth+150;
		
		context.fillRect(475,10,10,600);
		context.fillRect(700,10,10,600);
		context.fillRect(300,200,600,10);
		context.fillRect(300,400,600,10);
		
		//creating clear button
		const path = new Path2D()
		path.rect(25,72,100,50);
		path.closePath();
		context.font = "20px Arial";
		context.fillText("Clear",45,100,100,50);
		context.fillStyle = "#FFFFFF"
		context.fillStyle = "rgba(225,225,225,0.5)"
		context.fill(path)
		context.lineWidth = 2
		context.strokeStyle = "#000000"
		context.stroke(path)
		
		//creating done button
		const path2 = new Path2D()
		path2.rect(25,150,100,50);
		path2.closePath();
		context.font = "20px Arial";
		context.fillStyle = "#000000"
		context.fillText("Done",50,182,100,50);
		context.fillStyle = "#FFFFFF"
		context.fillStyle = "rgba(225,225,225,0.5)"
		context.fill(path2)
		context.lineWidth = 2
		context.strokeStyle = "#000000"
		context.stroke(path2)
	  }

	  else if (context.isPointInPath(path2, XY.x, XY.y))
	  {

		//Storing the max / min of the x/y coordinates to determine what range the values are in
		//context.fillText(regionNum,250,182,100,50);

		  //context.fillText(positionArrayX.length,230,40,100,50);
		  //const intercep = compare(positionArrayX,positionArrayY);
		 
		  if (lines == 3 || lines == 4)
		  {
			  win = "";
			  shape_drawn = "x";
			  shape_ai = "o";
			  comp_use = true;
			  
		  }
		  else if (lines == 1 || lines == 2)
		  {
			  win = "";
			  shape_drawn = "o";
			  shape_ai = "x";
			  comp_use = true;
		  }
		  else
		  {
			  alert("letter was not recognized please try again");
		  }
		minX = Math.min(...drawX);
		maxX = Math.max(...drawX);
		minY = Math.min(...drawY);
		maxY = Math.max(...drawY);
		spots = spotsleft();
		//First Row
		if((minX > 270 && maxX < 490) && (minY > 25 && maxY < 205)){
			board[0] = shape_drawn;
			if (win_state(board,shape_drawn))
			{
				score = -10;
				display_result(score);
			}
			else if (spots.length == 0)
			{
				score = 0;
				display_result(score);
			}
		}

		else if((minX > 480 && maxX < 700) && (minY > 25 && maxY < 200)){
			board[1] = shape_drawn;
			if (win_state(board,shape_drawn))
			{
				score = -10;
				display_result(score);
			}
			else if (spots.length == 0)
			{
				score = 0;
				display_result(score);
			}
		}

		else if((minX > 700 && maxX < 900) && (minY > 25 && maxY < 200)){
			board[2] = shape_drawn;
			if (win_state(board,shape_drawn))
			{
				score = -10;
				display_result(score);
			}
			else if (spots.length == 0)
			{
				score = 0;
				display_result(score);
			}
		}

		//Second Row
		else if((minX > 300 && maxX < 480) && (minY > 200 && maxY < 400)){
			board[3] = shape_drawn;
			if (win_state(board,shape_drawn))
			{
				score = -10;
				display_result(score);
			}
			else if (spots.length == 0)
			{
				score = 0;
				display_result(score);
			}
		}

		else if((minX > 480 && maxX < 700) && (minY > 200 && maxY < 400)){
			board[4] = shape_drawn;
			if (win_state(board,shape_drawn))
			{
				score = -10;
				display_result(score);
			}
			else if (spots.length == 0)
			{
				score = 0;
				display_result(score);
			}
		}

		else if((minX > 700 && maxX < 900) && (minY > 200 && maxY < 400)){
			board[5] = shape_drawn;
			if (win_state(board,shape_drawn))
			{
				score = -10;
				display_result(score);
			}
			else if (spots.length == 0)
			{
				score = 0;
				display_result(score);
			}
		}

		//Third Row
		else if((minX > 300 && maxX < 480) && (minY > 400 && maxY < 600)){
			board[6] = shape_drawn;
			if (win_state(board,shape_drawn))
			{
				score = -10;
				display_result(score);
			}
			else if (spots.length == 0)
			{
				score = 0;
				display_result(score);
			}
		}

		else if((minX > 480 && maxX < 700) && (minY > 400 && maxY < 600)){
			board[7] = shape_drawn;
			if (win_state(board,shape_drawn))
			{
				score = -10;
				display_result(score);
			}
			else if (spots.length == 0)
			{
				score = 0;
				display_result(score);
			}
		}

		else if((minX > 700 && maxX < 900) && (minY > 400 && maxY < 600)){
			board[8] = shape_drawn;
			if (win_state(board,shape_drawn))
			{
				score = -10;
				display_result(score);
			}
			else if (spots.length == 0)
			{
				score = 0;
				display_result(score);
			}
		}
		drawX = [];
		drawY = [];
		pp = 0;
		lines = 0;
		//if shape is recognized continue 
		if (comp_use == true)
		{
		  comp_use = false;
		  drawShape(shape_drawn,shape_ai,board);
		}
	  }
	}, false)
	
	function display_result(score)
	{
		if (score == -10)
		{
			alert("You beat the AI congrats!");
		}
		else if (score == 10)
		{
			alert("You lose, please try again");
		}
		else if (score == 0)
		{
			alert("Tie game!");
		}
	}
	//Draws the AI's move based on the optimal move determined by minimax algorithm
	function drawShape(shape_drawn,shape_ai,board)
	{
		var region_place = algo(board, shape_ai).index;
		spots = spotsleft();
		board[region_place] = shape_ai;		
		if (win_state(board,shape_ai))
		{
			score = 10;
			display_result(score);
		}
		else if (spots.length == 0)
		{
			score = 0;
			display_result(score);
		}
		if (shape_ai == "x")
		{
			var source = "x.png"
		}
		else 
		{
			var source = "o.png"
		}
		
		if(region_place == 0)
		{
				let x = new Image(); 
				x.src = source;
				context.drawImage(x,290,20,175,175);
		 }
		else if(region_place == 1)
		{
				let x = new Image(); 
				x.src = source;
				context.drawImage(x,505,20,175,175);
		}
		else if(region_place == 2)
		{
				let x = new Image(); 
				x.src = source;
				context.drawImage(x,710,20,175,175);
		}

		else if(region_place == 3)
		{
			let x = new Image(); 
			x.src = source;
			context.drawImage(x,290,220,175,175);
		}

		else if(region_place == 4)
		{
			let x = new Image(); 
			x.src = source;
			context.drawImage(x,505,220,175,175);
		}
		else if(region_place == 5)
		{
			let x = new Image(); 
			x.src = source;
			context.drawImage(x,710,220,175,175);
		}
		else if(region_place == 6)
		{
			let x = new Image(); 
			x.src = source;
			context.drawImage(x,290,420,175,175);
		}

		else if(region_place == 7)
		{
			let x = new Image(); 
			x.src = source;
			context.drawImage(x,505,420,175,175);
		}
		else if(region_place == 8)
		{
			let x = new Image(); 
			x.src = source;
			context.drawImage(x,710,420,175,175);
		}
	}
	
	//checks if the win states are met by either player
	function win_state(board, player) {
	let plays = board.reduce((a, e, i) =>
		(e === player) ? a.concat(i) : a, []);
	let winner = null;
	for (let [index, win] of combo.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			winner = {index: index, player: player};
			break;
		}
	}
	return winner;
	}

	//checks how many spotss left to fill on the board 
	function spotsleft() {
		aval = []
		var aval_c = 0;
		for (i = 0; i < board.length; i++)
		{
			if (board[i].toString().localeCompare("x") != 0 && board[i].toString().localeCompare("o") != 0)
			{
				aval[aval_c] = i;
				aval_c++;
			}
		}
		return aval;
	}
	//when the user clicks allow the draw function to draw
	function startPosition(){
		painting = true; 	
	}
	
	//when the user stops the press stops the draw function from continuing 
	function finishedPosition(){
		painting = false;
		context.beginPath();
		lines = lines + 1;
	}
	
	//Function that draws the user's move 
	function draw(e){
		if(!painting){
			return;
		}
		context.lineWidth =  20;
		context.lineCap = "round";
		context.lineTo(e.clientX, e.clientY);
		context.stroke();
		context.beginPath(); 
		context.moveTo(e.clientX,e.clientY);
		positionArrayX[cc] = e.clientX;
		positionArrayY[cc] = e.clientY;
		drawX[pp] = e.clientX;
		drawY[pp] = e.clientY;
		
		context.clearRect(0, 0, 250,50);
		context.fillText("(",30,40,100,50);
		context.fillText(positionArrayX[cc],35,40,100,50);
		context.fillText(",",70,40,100,50);
		context.fillText(positionArrayY[cc],75,40,100,50);
		context.fillText(")",110,40,100,50);
		cc++;
		pp++;
	}

	//Event Listeners to check for mouse click to draw and stop when button is not pressed
	canvas.addEventListener("mousedown", startPosition);
	canvas.addEventListener("mouseup", finishedPosition);
	canvas.addEventListener("mousemove",draw);

	//minimax algorithm used to determine which move is effect for the AI given that the user is playing optimally 
	function algo(newBoard, player) {
		var aval = spotsleft();
		if (win_state(newBoard, shape_drawn)) {
			return {score: -10};
		} else if (win_state(newBoard, shape_ai)) {
			return {score: 10};
		} else if (aval.length === 0) {
			return {score: 0};
		}
		var moves = [];
		for (var i = 0; i < aval.length; i++) {
			var move = {};
			move.index = newBoard[aval[i]];
			newBoard[aval[i]] = player;

			if (player == shape_ai) {
				var result = algo(newBoard, shape_drawn);
				move.score = result.score;
			} else {
				var result = algo(newBoard, shape_ai);
				move.score = result.score;
			}

			newBoard[aval[i]] = move.index;

			moves.push(move);
		}

		var bestMove;
		if(player === shape_ai) {
			var bestScore = -10000;
			for(var i = 0; i < moves.length; i++) {
				if (moves[i].score > bestScore) {
					bestScore = moves[i].score;
					bestMove = i;
				}
			}
		} else {
			var bestScore = 10000;
			for(var i = 0; i < moves.length; i++) {
				if (moves[i].score < bestScore) {
					bestScore = moves[i].score;
					bestMove = i;
				}
			}
		}
		return moves[bestMove];
	}
});

