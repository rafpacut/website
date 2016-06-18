function field(x, y, atomsMax)
{
	this.propagateDetonate = function(xCoeff, yCoeff) {
		if( xCoeff in board.fields && yCoeff in board.fields[xCoeff] )
		{
			var adjField = board.fields[xCoeff][yCoeff];
			adjField.clicked();
		}
	}

	this.detonate = function()
	{
		console.log("detonating "+this.x+" "+this.y);
		this.propagateDetonate(this.x+1,this.y);
		this.propagateDetonate(this.x  ,this.y+1);
		this.propagateDetonate(this.x-1,this.y);
		this.propagateDetonate(this.x  ,this.y-1);
	}

	this.imageSrcBasePath = "graphics/atoms/";

	this.getImgObj = function() {
		var el = document.getElementById("image"+this.x+"_"+this.y);
		return el;
	}


	this.clicked = function() {
		this.changeOwner();
		this.addAtom();
	}

	this.changeOwner = function() {
		if(this.owner != currentPlayer.color )

		this.owner = currentPlayer.color;
	}


	this.addAtom = function() 
	{
		this.atomsNr++;
		if(this.atomsNr >= this.atomsMax ){
			this.atomsNr = 0;
			this.detonate();
			var newImageSrc = this.imageSrcBasePath + 'blank.jpg';
		}
		else
		{
			var newImageSrc = this.imageSrcBasePath + this.owner+ this.atomsNr+".jpg";
		}
		this.image.src = newImageSrc;
	}

	this.x = x;
	this.y = y;
	this.owner = "neutral";
	this.atomsNr = 0;
	this.atomsMax = atomsMax;
	this.image = this.getImgObj();
}

function Board(length) {
	this.init = function() {
		this.length = length;

		var atomsMax = 5;
		this.fields = new Array(length);
		for(var i = 0; i < length; ++i) {
			this.fields[i] = new Array(length);
			for(var j = 0; j < length; ++j) {
				if( i == length-1 || i == 0) {
					atomsMax--;
				}
				if( j == length-1 || j == 0) {
					atomsMax--;
				}
				this.fields[i][j] = new field(i, j, atomsMax);
				atomsMax = 5;
			}
		}
	}
}

function player(playerColor)
{
	this.color = playerColor;
	this.fieldsOwned = 0;
}

function init()
{
	green = new player("green");
	red   = new player("red");
	currentPlayer = green;
	var DOMTable = document.getElementById("atomsTable");
	var boardDims = 8;


	var table_string = "<center><table id='atomsBoard'>";
	for(var i = 0; i < boardDims; ++i)
	{
		table_string += "<tr>";
		for( var j = 0; j < boardDims; ++j){
			table_string += "<td><img id=image"+i+"_"+j+" src=graphics/atoms/blank.jpg onclick=onClick(board,"+i+","+j+")></td>";
		}
		table_string+="</tr>";
	}
	table_string+= "</table></center>";

	var dummyEl = document.createElement("div");

	dummyEl.innerHTML = table_string;
	var table = dummyEl.firstChild;
	DOMTable.appendChild(table);

	board = new Board(boardDims);
	board.init();

}	

window.onload = init;


function changePlayer()
{
	if(currentPlayer.color == "red")
		currentPlayer.color = "green";
	else
		currentPlayer.color = "red";
}

function onClick(obj, x, y)
{
	if( board.fields[x][y].owner == currentPlayer.color || board.fields[x][y].owner == "neutral")
	{
		board.fields[x][y].clicked();
		changePlayer();
	}
}


