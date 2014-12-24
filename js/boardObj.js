var BoardObj = function(size){
	
	var size;
	var board;
	var pos;
	
	var unitSize;
	var offset;
	var markSize;
	
	
	(this.Initialize = function(){
		this.size = size;
		this.board = new Board();
		
		unitSize = size/3;
		offset = 0.05*unitSize;
		markSize = 0.9*unitSize;
		
		this.pos = new Array(offset, unitSize+offset, 2*unitSize+offset);
		
	})
	
	this.markBoard = function(x, y, player){
		return this.board.setMark(x, y, player);
	}
	
	this.victorious = function(){
		var end = 	(this.board.getMark(0,0) === this.board.getMark(0,1) && this.board.getMark(0,0) === this.board.getMark(0,2)) ? this.board.getMark(0,0) :
					(this.board.getMark(1,0) === this.board.getMark(1,1) && this.board.getMark(1,0) === this.board.getMark(1,2)) ? this.board.getMark(1,0) :
					(this.board.getMark(2,0) === this.board.getMark(2,1) && this.board.getMark(2,0) === this.board.getMark(2,2)) ? this.board.getMark(2,0) :
					(this.board.getMark(0,0) === this.board.getMark(1,0) && this.board.getMark(0,0) === this.board.getMark(2,0)) ? this.board.getMark(0,0) :
					(this.board.getMark(0,1) === this.board.getMark(1,1) && this.board.getMark(0,1) === this.board.getMark(2,1)) ? this.board.getMark(0,1) :
					(this.board.getMark(0,2) === this.board.getMark(1,2) && this.board.getMark(0,2) === this.board.getMark(2,2)) ? this.board.getMark(0,2) :
					(this.board.getMark(0,0) === this.board.getMark(1,1) && this.board.getMark(0,0) === this.board.getMark(2,2)) ? this.board.getMark(0,0) :
					(this.board.getMark(2,0) === this.board.getMark(1,1) && this.board.getMark(2,0) === this.board.getMark(0,2)) ? this.board.getMark(2,0) : '';
		
		return end;
	}
	
	this.isBoardFull = function(){
		return this.board.isFull();
	}
	
	this.clearBoard = function(){
		this.board = new Board();
	}
	
	this.GetImage = function(){
		var imgCanvas = document.createElement("canvas");
		var ctx = null;
		
		imgCanvas.width = this.size;
		imgCanvas.height = this.size;
		
		ctx = imgCanvas.getContext("2d");
		
		var imgBoard = this.BoardImg(this.size, this.size, Math.ceil(this.size/100));
		
		ctx.drawImage(imgBoard, 0, 0);
		
		var imgX = this.XImg(markSize, markSize, Math.floor(markSize/10));
		var imgO = this.OImg(markSize, Math.floor(markSize/10));
		
		for(var i=0; i<3; i++){
			for(var j=0; j<3; j++){
				switch(this.board.getMark(i, j)){
					case 'x':
						ctx.drawImage(imgX, this.pos[i], this.pos[j]);
						break;
					case 'o':
						ctx.drawImage(imgO, this.pos[i], this.pos[j]);
						break;
				}
			}
		}
		
		return imgCanvas;
	}
	
	this.BoardImg = function(width, height, lineWidth){
		
		lineWidth = typeof lineWidth !== 'number' ? 2 : lineWidth;
		
		var imgCanvas = document.createElement("canvas");
		var ctx = null;
		
		imgCanvas.width = width;
		imgCanvas.height = height;
		
		ctx = imgCanvas.getContext("2d");
		
		ctx.beginPath();
		ctx.moveTo((width/3), 0);
		ctx.lineTo((width/3), height);
		ctx.moveTo((width/3)*2, 0);
		ctx.lineTo((width/3)*2, height);
		ctx.moveTo(0, (height/3));
		ctx.lineTo(width, (height/3));
		ctx.moveTo(0, (height/3)*2);
		ctx.lineTo(width, (height/3)*2);
		
		ctx.lineWidth = lineWidth;
		ctx.stroke();
		
		ctx.closePath();
		
		return imgCanvas;
	}
	
	this.XImg = function(width, height, lineWidth){
		
		lineWidth = typeof lineWidth !== 'number' ? 5 : lineWidth;
		
		var imgCanvas = document.createElement("canvas");
		var ctx = null;
		
		var localOffset = Math.ceil(lineWidth/2);
		
		imgCanvas.width = width;
		imgCanvas.height = height;
		
		ctx = imgCanvas.getContext("2d");
		
		ctx.beginPath();
		ctx.moveTo(localOffset, localOffset);
		ctx.lineTo(width-localOffset, height-localOffset);
		ctx.moveTo(width-localOffset, localOffset);
		ctx.lineTo(localOffset, height-localOffset);
		ctx.lineWidth = lineWidth;
		ctx.stroke();
		ctx.closePath();
		
		return imgCanvas;
	}
	
	this.OImg = function(diameter, lineWidth){
		
		lineWidth = typeof lineWidth !== 'number' ? 5 : lineWidth;
		
		var imgCanvas = document.createElement("canvas");
		var ctx = null;
		
		var localOffset = Math.ceil(lineWidth/2);
		
		var radius = diameter/2;
		
		imgCanvas.width = radius*2;
		imgCanvas.height = radius*2;
		
		var x = radius,
			y = radius,
			startAngle = 0,
			radius = radius-localOffset;
			endAngle = 2 * Math.PI,
			counterClockwise = true;
		
		ctx = imgCanvas.getContext("2d");
		
		ctx.beginPath();
		ctx.arc(x, y, radius, startAngle, endAngle, counterClockwise);
		ctx.lineWidth = lineWidth;
		ctx.stroke();
		ctx.closePath();
		
		return imgCanvas;
	}

}

