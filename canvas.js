window.addEventListener("load", ()=>{						
	const canvas = document.querySelector("#canvas");
	const context = canvas.getContext("2d"); 		

	//	Dynamic sizing based on window size
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	
	context.fillRect((window.innerWidth/2-150),20,10,600);
	context.fillRect((window.innerWidth/2+150),20,10,600);
	context.fillRect(300,(window.innerHeight/2-100),800,10);
	context.fillRect(300,(window.innerHeight/2+100),800,10);
	
	let painting = false;
	
	//	Whether the user is painting or not is tracked to know when to stop 
	//	drawing and start a new line 
	
	function startPosition(){
		painting = true; 
	}
	
	function finishedPosition(){
		painting = false;
		context.beginPath();
	}
	
	//	Drawing function
	function draw(e){
		if(!painting){
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
		
	}
	
	//Need to add button to trigger this and clear screen
	function clearScreen(){
		context.clearRect(0, 0, canvas.width, canvas.height);
	}
	
	//	EventListeners
	canvas.addEventListener("mousedown", startPosition);
	canvas.addEventListener("mouseup", finishedPosition);
	canvas.addEventListener("mousemove",draw);
});
	

