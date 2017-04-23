Battleship.TurnState = Battleship.TurnState || {};
//  properties
Battleship.TurnState.intro_text;

Battleship.TurnState.init = function () {

};

Battleship.TurnState.preload = function () {
  
};

Battleship.TurnState.create = function () {
  this.game.stage.backgroundColor = '#4488cc';

  var bar = this.game.add.graphics();
  bar.beginFill(383533, 0.2);
  bar.drawRect(0, 300, 800, 100);

  var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

  // Text is positioned at 0, 100
  if (this.game.data.turn == "enemy") {
    this.intro_text = this.game.add.text(0, 0, "Enemy's Turn", style);
    this.intro_text.setShadow(3, 3, 'rgba(0, 0, 0, 0.5)', 2);
    this.intro_text.setTextBounds(-75, 300, 800, 100);
  } else {
    this.intro_text = this.game.add.text(0, 0, "Your Turn", style);
    this.intro_text.setShadow(3, 3, 'rgba(0, 0, 0, 0.5)', 2);
    this.intro_text.setTextBounds(-75, 300, 800, 100);
  }
  
  bar.inputEnabled = true;
  bar.events.onInputDown.add(this.gameStart, this);

};

Battleship.TurnState.gameStart = function(state) {
  this.game.state.start("GameState");
};

Battleship.TurnState.shutdown = function() {
  console.log("shutdown homestate");
};