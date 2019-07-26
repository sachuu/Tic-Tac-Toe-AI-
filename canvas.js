window.addEventListener("load", ()=>{						
	//make rectangles all over the titles and track cordinates and have the computer not allow anything outside of it
	const canvas = document.querySelector("#canvas");
	const context = canvas.getContext("2d"); 	
	var timerVar;
	var ai_shape = 0;
	var win = "";
	var hard = 0;
	var totalSeconds = 0;
	var position = 40;
	var cc = 0;
	var pp = 0;
	var i = 0;
	var lines = 0;
	var region_count = 0;
	var drawX = []
	var drawY = []
	var positionArrayX = [];
	var play = "";
	var board = [];
	var positionArrayY = [];
	const winCombos = [  //array thats gonna show winning combinations
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
]; 
	var region = [0,1,2,3,4,5,6,7,8];
	var wincombo1 = [0,1,2];
	var wincombo2 = [3,4,5];
	var wincombo3 = [6,7,8];
	var wincombo4 = [0,3,6];
	var wincombo5 = [1,4,7];
	var wincombo6 = [2,5,8];
	var wincombo7 = [0,4,8];
	var wincombo8 = [6,4,2];
	var minX;
	var maxX;
	var minY;
	var maxY;
	var shape_drawn = "";
	var shape_ai = "";
	var score = 0;
	var comp_use = false;
	
	//	Dynamic sizing based on window size
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	
	context.fillRect(475,10,10,600);
	context.fillRect(700,10,10,600);
	context.fillRect(300,200,600,10);
	context.fillRect(300,400,600,10);

	//creating button
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
	
	//creating button
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
	
	let painting = false;
	
	//	Whether the user is painting or not is tracked to know when to stop 
	//	drawing and start a new line 
	
	function startPosition(){
		painting = true; 	
	}
	
	//function for the button 
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
		
		//creating button
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
		
		//creating button
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
		  const intercep = compare(positionArrayX,positionArrayY);
		 
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
		minX = Math.min(...drawX);
	  	maxX = Math.max(...drawX);
	  	minY = Math.min(...drawY);
	  	maxY = Math.max(...drawY);
	  	if((minX > 270 && maxX < 490) && (minY > 25 && maxY < 205)){
	  		region[0] = shape_drawn;
			region_count++;
	  	}

		else if((minX > 480 && maxX < 700) && (minY > 25 && maxY < 200)){
			region[1] = shape_drawn;
			region_count++;
		}

		else if((minX > 700 && maxX < 900) && (minY > 25 && maxY < 200)){
			region[2] = shape_drawn;
			region_count++;
		}

		//Second Row
		else if((minX > 300 && maxX < 480) && (minY > 200 && maxY < 400)){
			region[3] = shape_drawn;
			region_count++;
		}

		else if((minX > 480 && maxX < 700) && (minY > 200 && maxY < 400)){
			region[4] = shape_drawn;
			region_count++;
		}

		else if((minX > 700 && maxX < 900) && (minY > 200 && maxY < 400)){
			region[5] = shape_drawn;
			region_count++;
		}

		//Third Row
		else if((minX > 300 && maxX < 480) && (minY > 400 && maxY < 600)){
			region[6] = shape_drawn;
			region_count++;
		}

		else if((minX > 480 && maxX < 700) && (minY > 400 && maxY < 600)){
			region[7] = shape_drawn;
			region_count++;
		}

		else if((minX > 700 && maxX < 900) && (minY > 400 && maxY < 600)){
			region[8] = shape_drawn;
			region_count++;
		}
		drawX = [];
		drawY = [];
		pp = 0;
		lines = 0;
	    if (comp_use == true)
	    {
		  comp_use = false;
		  drawShape(region_count,shape_drawn,shape_ai,region);
	    }
	  }
	}, false)
	
	function finishedPosition(){
		painting = false;
		context.beginPath();
		lines = lines + 1;
	}
	function empty(board)
	{
		/*
		aval = []
		var aval_c = 0;
		for (i = 0; i < region.length; i++)
		{
			if (region[i].toString().localeCompare("x") != 0 && region[i].toString().localeCompare("o") != 0)
			{
				aval[aval_c] = i;
				aval_c++;
			}
		}
		return aval;*/
		return board.filter(s => typeof s === 'number');
	}
	function array_equal(arr1,arr2)
	{
		for (i = 0; i < arr1.length; i++)
		{
			if (arr1[i].toString().localeCompare("x") == 0)
			{
				arr2[i] = "x";
			}
			else if (arr1[i].toString().localeCompare("o") == 0)
			{
				arr2[i] = "o";
			}
			else 
			{
				arr2[i] = i;
			}
		}
		return arr2;
	}
	function drawShape(region_count,shape_drawn,shape_ai,region)
	{
		new_board = [];
		new_board = array_equal(region,new_board);
		console.log(new_board);
		var region_place = algo(shape_ai,new_board,shape_ai,shape_drawn);
		//console.log(region_place);
		region_place = region_place.index;
		region[region_place] = shape_ai;		
		region_count++;
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
		//console.log(region);
	}
	
	function winCheck(board,player)
	{
		let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []); //finding every index that the player has played
		let gameWon = null;
		for (let [index, win] of winCombos.entries()) { //checking if the game has been won by looping through every winCombos
			if (win.every(elem => plays.indexOf(elem) > -1)) { //has the player played in every spot that counts as a win for that win
				  win = {index: index, player: player};  //which win combo the player won at & which player had won
				  break;
			}
		}
		return win;
	}

	function outputResult(score)
	{
		if (score == 10)
		{
			alert("You lose the game!");
		}
		else if (score == -10)
		{
			alert("You win the game!");
		}
		else if (score == 0)
		{
			alert("Tie game!");
		}
	}
	function algo(play,board,shape_ai,shape_drawn)
	{
		aval = empty(board);
		if (region_count == 0)
		{
			return;
		}
		else 
		{
			if (winCheck(board,shape_drawn))
			{
				if (aval.length == 0)
				{
					outputResult(score = -10);
				}
				else 
				{
					return {score: -10};
				}
				
			}
			else if (winCheck(board,shape_ai))
			{
				if (aval.length == 0)
				{
					outputResult(score = 10);
				}
				else 
				{
					return {score: 10};
				}
			}
			else if (aval.length == 0)
			{
				if (region_count == 9)
				{
					outputResult(score = 0);
				}
				return {score: 0};
			}
			var moves = [];
			for (var i = 0; i < aval.length; i++) {
				var move = {};
				move.index = board[aval[i]];
				board[aval[i]] = play;
				if (play == shape_ai) 
				{
					var result = algo(shape_drawn,board,shape_ai,shape_drawn);
					move.score = result.score;
				} 
				else 
				{
					var result = algo(shape_ai,board,shape_ai,shape_drawn)
					move.score = result.score;
				}	
				board[aval[i]] = move.index;
				moves.push(move);
			}	
				var bestMove;
				if(play === shape_ai) {
					var bestScore = -10000;
					for(var i = 0; i < moves.length; i++) {
						
						if (moves[i].score > bestScore) {
							bestScore = moves[i].score;
							bestMove = i;
						}
					}
				}			
				else 
				{
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
	}
	function compare(positionArrayX,positionArrayY){

		i = 0;
		var j = 0;
		var positioner = 0;
		var intercepts = 0; 

		for(i=0;i < positionArrayX.length;i++){
			for(j= i + 1;j<positionArrayX.length;j++){
				if(positionArrayX[j] === positionArrayX[i] && i != j)
				{
					if ((positionArrayY[j] === positionArrayY[i]))
					{
						intercepts++;
					}
				}
			}
		}
		return intercepts
	}
	function draw(e){
		if(!painting){
			return;
		}
		//	line settings
		context.lineWidth =  20;
		context.lineCap = "round";
		
		//	actual drawing starts
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
	
	//	EventListeners
	canvas.addEventListener("mousedown", startPosition);
	canvas.addEventListener("mouseup", finishedPosition);
	canvas.addEventListener("mousemove",draw);
});
