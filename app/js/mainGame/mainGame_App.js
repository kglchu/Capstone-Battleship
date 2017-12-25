mainGame.prototype.app = function()
{
	var myself = this;
	
	// Create new Phaser Game object, with dimensions
	myself.Battleship.game = new Phaser.Game(664, 846, Phaser.AUTO, this.canvas);
	//  custom properties
	myself.Battleship.game.data = {};

	// 'global' data objects changing the text on home and gameover screens
	myself.Battleship.game.data.loser = "";
	myself.Battleship.game.data.turn = "player";
	myself.Battleship.game.data.playerBoardIndex = null;
	myself.Battleship.game.data.enemyBoardIndex = null;

	// score for player
	myself.Battleship.game.data.playerScore = 0;

	myself.Battleship.game.data.playerBoard = null;
	myself.Battleship.game.data.enemyBoard = null;

	myself.Battleship.game.data.currentEnemyBoard = {};
	myself.Battleship.game.data.currentPlayerBoard = {};

	// trigger for enemy AI to start shooting
	myself.Battleship.game.data.isShooting = false;

	// Add first state to game object
	myself.Battleship.game.state.add('HomeState', myself.Battleship.HomeState);
	myself.Battleship.game.state.add('TurnState', myself.Battleship.TurnState);
	myself.Battleship.game.state.add('GameState', myself.Battleship.GameState);
	myself.Battleship.game.state.add('GameOverState', myself.Battleship.GameOverState);
	myself.Battleship.game.state.start('HomeState');
}