// On initial boot of game, define constants
var Battleship = Battleship || {};
Battleship.GameState = Battleship.GameState || {};

Battleship.GameState.SHOT_DELAY = 200; // milliseconds
Battleship.GameState.BULLET_SPEED = 850; // pixels per second
Battleship.GameState.NUMBER_OF_BULLETS = 1;

// board constants
Battleship.GameState.BOARD_COLS; // columns
Battleship.GameState.BOARD_ROWS; // rows
Battleship.GameState.CELL_SIZE = 64; // pixels
Battleship.GameState.CELL_SPACING = 2; // margin/spacing
Battleship.GameState.CELL_SIZE_SPACED = Battleship.GameState.CELL_SIZE + Battleship.GameState.CELL_SPACING; // total size of cell

// variable used to keep track of last cell hit and if it was populated or not
Battleship.GameState.playerShipLastHit = null;
Battleship.GameState.playerShipFound = false;
Battleship.GameState.totalPlayerHits = 0;