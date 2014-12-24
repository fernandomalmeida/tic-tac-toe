var Board = function(){
	var table = new Array(
						new Array('', '', ''),
						new Array('', '', ''),
						new Array('', '', '')
				);
	
	this.isPlaceEmpty = function(i, j){
		return table[i][j] === '';
	}
	
	this.setMark = function(i, j, mark){
		if(!this.isPlaceEmpty(i, j))
			return false
		table[i][j] = mark;
		return true;
	}
	
	this.getMark = function(i, j){
		return table[i][j];
	}
	
	this.isFull = function(){
		var i, j;
		
		for(i=0; i<3; i++){
			for(j=0; j<3; j++){
				if(this.isPlaceEmpty(i, j)){
					return false;
				}
			}
		}
		
		return true;
	}
}

Board.prototype.toString = function(isHTML){
	var retStr = '';
	var i, j;
	
	for(i=0; i<3; i++){
		for(j=0; j<3; j++){
			retStr += (this.table[i][j] === '')?('-'):(this.table[i][j]);
		}
		if(isHTML)
			retStr += '<br/>';
		else
			retStr += '\n';
	}
	
	return retStr;
}
