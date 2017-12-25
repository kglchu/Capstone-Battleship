// Main Game Object

function mainGame(divID)
{
	this.Battleship;
	this.canvas = divID;
	
	this.initialize = function()
	{
		this.boot();
		this.home();
		this.gameOver();
		this.preload();
		this.enemy();
		this.game();
		this.app();
	}

}