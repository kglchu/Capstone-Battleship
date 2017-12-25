mainGame.prototype.boot = function()
{
	var myself = this;
	
	this.Battleship = this.Battleship || {};
	myself.Battleship.GameState = myself.Battleship.GameState || {};

	myself.Battleship.GameState.SHOT_DELAY = 200; // milliseconds
	myself.Battleship.GameState.BULLET_SPEED = 850; // pixels per second
	myself.Battleship.GameState.NUMBER_OF_BULLETS = 1;

	// board constants
	myself.Battleship.GameState.BOARD_COLS; // columns
	myself.Battleship.GameState.BOARD_ROWS; // rows
	myself.Battleship.GameState.CELL_SIZE = 64; // pixels
	myself.Battleship.GameState.CELL_SPACING = 2; // margin/spacing
	myself.Battleship.GameState.CELL_SIZE_SPACED = myself.Battleship.GameState.CELL_SIZE + myself.Battleship.GameState.CELL_SPACING; // total size of cell

	// variable used to keep track of last cell hit and if it was populated or not
	myself.Battleship.GameState.playerShipLastHit = null;
	myself.Battleship.GameState.playerShipFound = false;
	myself.Battleship.GameState.totalPlayerHits = 0;
}