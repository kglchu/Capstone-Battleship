// Create new Phaser Game object, with dimensions
Battleship.game = new Phaser.Game(664, 730, Phaser.AUTO, 'game-canvas');
// Add first state to game object
Battleship.game.state.add('HomeState', Battleship.HomeState);
Battleship.game.state.add('GameState', Battleship.GameState);
Battleship.game.state.add('GameOverState', Battleship.GameOverState);
Battleship.game.state.start('HomeState');