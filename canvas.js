window.addEventListener("load", ()=>{						
	//make rectangles all over the titles and track cordinates and have the computer not allow anything outside of it
	const canvas = document.querySelector("#canvas");
	const context = canvas.getContext("2d"); 	
	var timerVar;
	var totalSeconds = 0;
	var position = 40;
	
	var positionArray = [];
	
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
	
	let painting = false;
	
	//	Whether the user is painting or not is tracked to know when to stop 
	//	drawing and start a new line 
	
	function startPosition(){
		painting = true; 	
	}
	
	//function for the button 
	function getXY(canvas, event){
	  const rect = canvas.getBoundingClientRect()
	  const y = event.clientY - rect.top
	  const x = event.clientX - rect.left
	  return {x:x, y:y}
	}
	
	//listens for the button click to clear
	canvas.addEventListener("click",  function (e) {
	  //stops drawing on the button 
	  painting = false;
	  const XY = getXY(canvas, e)
	  // if button at location is clicked perform clear operation
	  if(context.isPointInPath(path, XY.x, XY.y)) {
		context.clearRect(0, 0, canvas.width, canvas.height);
		 //	Dynamic sizing based on window size
		canvas.height = window.innerHeight;
		canvas.width = window.innerWidth;
		
		context.fillRect(475,10,10,600);
		context.fillRect(700,10,10,600);
		context.fillRect(300,200,600,10);
		context.fillRect(300,400,600,10);;
		
		/*
		context.fillRect((window.innerWidth/2-150),20,10,600);
		context.fillRect((window.innerWidth/2+150),20,10,600);
		context.fillRect(300,(window.innerHeight/2-100),800,10);
		context.fillRect(300,(window.innerHeight/2+100),800,10);*/
		
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
	  }
	}, false)
	
	function finishedPosition(){
		painting = false;
		context.beginPath();
	}
	//	Drawing function
	timerVar = setInterval(draw, 1000);

	function draw(e){
		if(!painting){
			clearInterval(timerVar);
			return;
		}
		//	line settings
		context.lineWidth = 10;
		context.lineCap = "round";
		
		//	actual drawing starts
		context.lineTo(e.clientX, e.clientY);
		context.stroke();
		context.beginPath(); 
		context.moveTo(e.clientX,e.clientY);
		context.clearRect(0, 0, 80,40);
		++totalSeconds;
		var hour = Math.floor(totalSeconds /3600);
		var minute = Math.floor((totalSeconds - hour*3600)/15);
		var seconds = totalSeconds - (hour*3600 + minute*60);
		
		//Push the coordinates into an array for use later
		positionArray[seconds] = e.clientX;
		context.fillText(positionArray[seconds],40,40,100,50);
	}
	
	//	EventListeners
	canvas.addEventListener("mousedown", startPosition);
	canvas.addEventListener("mouseup", finishedPosition);
	canvas.addEventListener("mousemove",draw);
});
