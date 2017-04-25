// Create new Phaser Game object, with dimensions
Battleship.game = new Phaser.Game(664, 730, Phaser.AUTO, 'game-canvas');
//  custom properties
Battleship.game.data = {};

// 'global' data objects changing the text on home and gameover screens
Battleship.game.data.loser = "";
Battleship.game.data.turn = "player";

// score for player
Battleship.game.data.playerScore = 0;

Battleship.game.data.currentEnemyBoard = {};
Battleship.game.data.currentEnemyBoard.cellStatus = 0;

Battleship.game.data.isShooting = false;

// Add first state to game object
Battleship.game.state.add('HomeState', Battleship.HomeState);
Battleship.game.state.add('TurnState', Battleship.TurnState);
Battleship.game.state.add('GameState', Battleship.GameState);
Battleship.game.state.add('GameOverState', Battleship.GameOverState);
Battleship.game.state.start('HomeState');