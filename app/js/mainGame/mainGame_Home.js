mainGame.prototype.home = function()
{
	var myself = this;
	
	myself.Battleship.HomeState = myself.Battleship.HomeState || {};
	//  properties
	myself.Battleship.HomeState.intro_text;

	myself.Battleship.HomeState.init = function () {

	};

	myself.Battleship.HomeState.preload = function () {
	  
	};

	myself.Battleship.HomeState.create = function () {
	  this.game.stage.backgroundColor = '#4488cc';

	  var bar = this.game.add.graphics();
	  bar.beginFill(0x000000, 0.2);
	  bar.drawRect(0, this.game.world.centerY - 50, 800, 100);

	  var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

	  // Text is positioned at 0, 100
	  this.intro_text = this.game.add.text(0, 0, "Tap Screen to Start", style);
	  this.intro_text.setShadow(3, 3, 'rgba(0, 0, 0, 0.5)', 2);
	  this.intro_text.setTextBounds(-75, this.game.world.centerY - 50, 800, 100);
	  
	  bar.inputEnabled = true;
	  bar.events.onInputDown.add(this.gameStart, this);

	};

	myself.Battleship.HomeState.gameStart = function(state) {
	  this.game.data.turn = "player";
	  this.game.state.start("GameState");
	};

	myself.Battleship.HomeState.shutdown = function() {
	  
	};
}