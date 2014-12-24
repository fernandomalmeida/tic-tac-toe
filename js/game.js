var Game = function(){
	
	var canvas;
	var canvasCtx;
	var bufferCanvas;
	var bufferCanvasCtx;
	var size;
	
	var boardX;
	var boardY;
	
	var currentPlayer;
	
	this.Initialize = function(){
		size = 180;
		boardX = 10;
		boardY = 10;
		currentPlayer = 'x';
		boardObj = new BoardObj(size);
		canvas = document.getElementById('gameCanvas');
		
		boardObj.Initialize();
		canvasCtx = canvas.getContext('2d');
		
		bufferCanvas = document.createElement('canvas');
		bufferCanvas.width = canvas.width;
		bufferCanvas.height = canvas.height;
		bufferCanvasCtx = bufferCanvas.getContext('2d');
	}
	
	this.Run = function(){
		this.Initialize();
		$(document).bind("mousemove mouseup", {game: this}, function(event){
			event.data.game.Draw();
		})
		$("#gameCanvas").bind("click", {game: this}, this.ClickHandler)
	}
	
	this.Update = function(event){
		
	}
	
	this.Draw = function(){
		canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
		bufferCanvasCtx.clearRect(0, 0, bufferCanvas.width, bufferCanvas.height);
		
		var imgBoard = boardObj.GetImage();
		
		bufferCanvasCtx.drawImage(imgBoard, boardX, boardY);
		
		canvasCtx.drawImage(bufferCanvas, 0, 0);
	}
	
	this.ClickHandler = function(event){
		var canvasOffset = $("#gameCanvas").offset();
		
		var clickPosX = event.pageX - canvasOffset.left - boardX;
		var clickPosY = event.pageY - canvasOffset.top - boardY;
		
		if(clickPosX >= 0 && clickPosX <= size && clickPosY >= 0 && clickPosY <= size){
			var x, y;
			
			if(clickPosX <= size/3){
				x = 0;
			} else if(clickPosX <= 2*size/3){
				x = 1;
			} else if(clickPosX <= size){
				x = 2;
			}
			
			if(clickPosY <= size/3){
				y = 0;
			} else if(clickPosY <= 2*size/3){
				y = 1;
			} else if(clickPosY <= size){
				y = 2;
			}
			
			var success = boardObj.markBoard(x, y, currentPlayer);
			
			if(!success){
				alert("Already have a mark!");
			} else {
				if(currentPlayer === 'x')
					currentPlayer = 'o';
				else
					currentPlayer = 'x';
				
				
				event.data.game.checkEndGame();
			}
		
		}
		
		event.data.game.Draw();
	}
	
	this.checkEndGame = function(){
		switch(boardObj.victorious()){
			case 'x':
				alert('X won!');
				boardObj.clearBoard();
				break;
			case 'o':
				alert('O won!');
				boardObj.clearBoard();
				break;
			default:
				if(boardObj.isBoardFull()){
					alert('Tie!');
					boardObj.clearBoard();
				}
				break;
		}
	}
	
	/*this.Test = function(){
		boardObj.markBoard(0, 0, 'o');
		boardObj.markBoard(0, 1, 'x');
		boardObj.markBoard(2, 0, 'o');
		boardObj.markBoard(2, 2, 'x');
	}*/
	
}
