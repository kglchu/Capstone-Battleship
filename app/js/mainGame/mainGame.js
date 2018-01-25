// Main Game Object

function mainGame(divID)
{
	this.Battleship = {};
	this.canvas = divID;
	this.board;
	this.startScreen;
	
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

mainGame.prototype.start = function()
{
	this.Battleship.game = new Phaser.Game(664, 846, Phaser.AUTO, this.canvas);
	this.startScreen = new startScreen(this.Battleship);
	this.startScreen.showScreen(this.enterBattle);
}

mainGame.prototype.enterBattle = function()
{
	alert("TODO: Build Battle Phase");
}