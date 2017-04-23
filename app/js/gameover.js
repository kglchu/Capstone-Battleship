Battleship.GameOverState = Battleship.GameOverState || {};
//  properties
Battleship.GameOverState.intro_text;

Battleship.GameOverState.init = function () {

};

Battleship.GameOverState.preload = function () {
  
};

Battleship.GameOverState.create = function() {

  this.game.stage.backgroundColor = '#222';

  var bar = this.game.add.graphics();
  bar.beginFill(0x000000, 0.2);
  bar.drawRect(0, 300, 800, 100);

  var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

  // Text is positioned at 0, 100
  if (this.game.data.loser == "player") {
    this.intro_text = this.game.add.text(0, 0, "You Lost! Tap to Restart", style);
    this.intro_text.setShadow(3, 3, 'rgba(0, 0, 0, 0.5)', 2);
    this.intro_text.setTextBounds(-75, 300, 800, 100);
 } else if (this.game.data.loser == "enemy") {
    this.intro_text = this.game.add.text(0, 0, "You Win! Tap to Restart", style);
    this.intro_text.setShadow(3, 3, 'rgba(0, 0, 0, 0.5)', 2);
    this.intro_text.setTextBounds(-75, 300, 800, 100);
 }

  bar.inputEnabled = true;
  bar.events.onInputDown.add(this.gameStart, this);

};

Battleship.GameOverState.gameStart = function() {
  this.game.state.start("GameState");
};

Battleship.GameOverState.shutdown = function() {
  console.log("shutdown game over");
};