Battleship.GameState.spawnPlayerBoard = function(board) {
  this.BOARD_COLS = 10; //Math.floor(this.game.world.width / this.CELL_SIZE_SPACED);
  this.BOARD_ROWS = 10; //Math.floor((this.game.world.height / this.CELL_SIZE_SPACED) - 1);

  this.playerCells = this.game.add.group();

  this.playerCells.ship2 = 0;
  this.playerCells.ship3 = 0;
  this.playerCells.ship4 = 0;
  this.playerCells.ship5 = 0;
  this.playerCells.ship6 = 0;

  // sets current visibility to false for players' board
  this.playerShips.ship2.placed = false;
  this.playerShips.ship3.placed = false;
  this.playerShips.ship4.placed = false;
  this.playerShips.ship5.placed = false;
  this.playerShips.ship6.placed = false;

  // pCell = player board cells
  for (var Col = 0; Col < this.BOARD_COLS; Col++) {
    for (var Row = 0; Row < this.BOARD_ROWS; Row++) {
      var pCell = this.playerCells.create((Col * this.CELL_SIZE_SPACED) + this.CELL_SIZE_SPACED/2 + 2, (Row * this.CELL_SIZE_SPACED + this.CELL_SIZE/2 + 64), 'cell', 0);
      pCell.anchor.setTo(0.5, 0.5);
      pCell.enemyContact = 0; // var used to represent successful hit
      pCell.marker = board.matrix[Row][Col];
      this.shipPlacement(this.playerShips, pCell, pCell.marker, false, board.index);
      pCell.posX = pCell.x;
      pCell.posY = pCell.y;
      // check to see if there is a marker in cell
      pCell.hasEnemy = pCell.marker > 0;
      pCell.isHit = false;
    }
  }
};

Battleship.GameState.enemyHit = function(cell) {
  // mark off enemy ship
  cell.hasEnemy = false;
  // loads and plays explosion audio when hit
  this.shipHit = this.add.audio('explosion');
  this.shipHit.play();
};

Battleship.GameState.sunkEnemyBattleship = function(cell) {
    // check to see if all markers of the enemy have been hit
    switch (cell.enemyContact)
    {
        case 2:
            this.cells.ship2 += cell.enemyContact;
            if (this.cells.ship2 === 4) {
                this.sunkShip = this.add.audio('sunkenShip');
                this.sunkShip.play();
                this.shakeCamera();
                // make ship visible
                this.enemyShips.ship2.location.visible = true;
                this.enemyShips.ship2.sunken = true;
                this.game.data.playerScore += 4;
            }
        break;

        case 3:
            this.cells.ship3 += cell.enemyContact;
            if (this.cells.ship3 === 9) {
                this.sunkShip = this.add.audio('sunkenShip');
                this.sunkShip.play();
                this.shakeCamera();
                // make ship visible
                this.enemyShips.ship3.location.visible = true;
                this.enemyShips.ship3.sunken = true;
                this.game.data.playerScore += 9;
            }
        break;

        case 4:
            this.cells.ship4 += cell.enemyContact;
            if (this.cells.ship4 === 16) {
                this.sunkShip = this.add.audio('sunkenShip');
                this.sunkShip.play();
                this.shakeCamera();
                // make ship visible
                this.enemyShips.ship4.location.visible = true;
                this.enemyShips.ship4.sunken = true;
                this.game.data.playerScore += 16;
            }
        break;

        case 5:
            this.cells.ship5 += cell.enemyContact;
            if (this.cells.ship5 === 25) {
                this.sunkShip = this.add.audio('sunkenShip');
                this.sunkShip.play();
                this.shakeCamera();
                // make ship visible
                this.enemyShips.ship5.location.visible = true;
                this.enemyShips.ship5.sunken = true;
                this.game.data.playerScore += 25;
            }
        break;

        case 6:
            this.cells.ship6 += cell.enemyContact;
            if (this.cells.ship6 === 36) {
                this.sunkShip = this.add.audio('sunkenShip');
                this.sunkShip.play();
                this.shakeCamera();
                // make ship visible
                this.enemyShips.ship6.location.visible = true;
                this.enemyShips.ship6.sunken = true;
                this.playerShipLastHit = null;
                this.playerShipFound = false;
                this.game.data.playerScore += 36;
            }
        break;
    }

    // checks if enemy lost
    if (this.enemyShips.ship2.location.visible === true && this.enemyShips.ship3.location.visible === true && this.enemyShips.ship4.location.visible === true && this.enemyShips.ship5.location.visible === true && this.enemyShips.ship6.location.visible === true) {
        this.game.data.loser = "enemy";
        this.enemyShips.ship2.location.visible = false;
        this.enemyShips.ship3.location.visible = false;
        this.enemyShips.ship4.location.visible = false;
        this.enemyShips.ship5.location.visible = false;
        this.enemyShips.ship6.location.visible = false;
    }
};

Battleship.GameState.miss = function(cell) {
  // mark a miss sprite on the board
  cell.frame = 2;
  // loads and plays miss audio
  this.missEnemy = this.add.audio('miss');
  this.missEnemy.play();
};

Battleship.GameState.simulateShooting = function(cellGroup) {
    this.game.data.isShooting = true;
    // setTimeouts delay the shot by enemy AI and makes sure to recalculate
    // a shot if it chooses the same cell
    var cell;
    if (this.reservedBullets > 0 && !this.game.data.loser) {
        // check to see if there were any ships hit
        if(this.playerShipLastHit && this.playerShipFound) {
            cell = this.getAdjacentCell(this.playerShipLastHit);
            if (cell === undefined) {
                this.playerShipLastHit += this.totalPlayerHits;
                this.totalPlayerHits = 0;
                cell = this.getAdjacentCell(this.playerShipLastHit);
                if (!cell) {
                    cell = this.playerCells.getChildAt(this.game.rnd.integerInRange(0, 99));
                    this.playerShipLastHit = null;
                    this.totalPlayerHits = 0;
                    this.playerShipFound = false;
                }
            }
            this.gun.rotation = Math.atan2(cell.y - this.gun.y, cell.x - this.gun.x);
            if (!cell.isHit) {
                this.selectCell(cell);
                setTimeout(function () {
                Battleship.GameState.unselectCell(cell);
                }, 350);
            } else {
                this.simulateShooting(this.playerCells);
            }
        } 

        if (!cell && !this.playerShipFound) {
            // if the selected cell has not been hit, then fire at cell
            cell = this.playerCells.getChildAt(this.game.rnd.integerInRange(0, 99));
            this.gun.rotation = Math.atan2(cell.y - this.gun.y, cell.x - this.gun.x);
            if (!cell.isHit) {
                this.selectCell(cell);
                setTimeout(function () {
                Battleship.GameState.unselectCell(cell);
                }, 350);
            } else {
                this.simulateShooting(this.playerCells);
            }
        }
    
    } else {
        setTimeout(function() {
            //Battleship.game.data.isShooting = true;
            Battleship.GameState.switchTurn('player');
        }, 100);
    }
        
};

function callShootAgain(cells) {
    Battleship.GameState.simulateShooting(cells);
}

Battleship.GameState.getAdjacentCell = function(focusedCell) {
    // nearbyCell will be the new selected cell
    var nearbyCell;

    // all cells that are near the currently focused cell
    var rightCell = this.playerCells.getChildAt(focusedCell + 10);
    var leftCell = this.playerCells.getChildAt(focusedCell - 10);
    var topCell = this.playerCells.getChildAt(focusedCell - 1);
    var bottomCell = this.playerCells.getChildAt(focusedCell + 1);

    if (!bottomCell.isHit && bottomCell.hasEnemy){
        nearbyCell = this.playerCells.getChildAt(focusedCell + 1);
        this.totalPlayerHits -= 1;
        return nearbyCell;
    }

    if(!topCell.isHit && topCell.hasEnemy){
        nearbyCell = this.playerCells.getChildAt(focusedCell - 1);
        this.totalPlayerHits += 1;
        return nearbyCell;
    }

    if (!rightCell.isHit && rightCell.hasEnemy) {
        nearbyCell = this.playerCells.getChildAt(focusedCell + 10);
        this.totalPlayerHits -= 10;
        return nearbyCell;
    }

    if (!leftCell.isHit && leftCell.hasEnemy){
        nearbyCell = this.playerCells.getChildAt(focusedCell - 10);
        this.totalPlayerHits += 10;
        return nearbyCell;
    }
};

Battleship.GameState.updateEnemyAmmo = function() {
  var ammo = this.enemyAmmo.getChildAt(this.reservedBullets - 1);

  ammo.visible = false;
};

// collision method to keep track of the damage done to player
Battleship.GameState.checkEnemyCollision = function() {
    this.game.physics.arcade.collide(this.bulletPool, this.playerCells, function(bullet, cell) {
    // trigger explosion
      bullet.kill();
      cell.isHit = true;

      if (cell.hasEnemy) {
        // enemy was hit
        this.playerShipLastHit = this.playerCells.getChildIndex(cell);
        this.getExplosion(cell, cell.posX, cell.posY);
        this.getHitLocation("enemy", cell, cell.x, cell.y);
        this.shipSmoke("enemy", cell, cell.x, cell.y);
        this.enemyHit(cell);
        this.playerShipFound = true;
        // check for sunken ship
        this.sunkPlayerBattleship(cell);
        this.game.data.playerScore -= cell.enemyContact;
        this.score.text = this.scoreText + this.game.data.playerScore;
        if (this.game.data.playerScore < 0) {
            this.score.text = this.scoreText + 0;
        }
        setTimeout(function () { callShootAgain(this.playerCells); }, 900);
      } else {
          // there is nothing in the cell
          this.miss(cell);
          this.totalPlayerHits = 0;
          this.playerShipLastHit = this.playerCells.getChildIndex(cell);
          setTimeout(function () { callShootAgain(this.playerCells); }, 1200);
      }

      // destroy gun and ships, reset board
      if (this.gameOver) {
        this.cells.forEach(function (item) {
          item.frame = 0;
        }, this);

        // destroy all objects before restarting game
        this.music.stop();
        this.game.data.loser = "player";
        setTimeout(function(){Battleship.game.state.start("GameOverState");}, 500);
      }

      if(cell.body.enable) {
        cell.body.enable = false;
      }
    }, null, this);
};

Battleship.GameState.GameOverEnemy = function() {
  var board = {};
  var enemyBoardScore = 0;

  board = this.playerCells.children;
  for (var i = 0; i < board.length; i++) {
    enemyBoardScore += board[i].marker;
  }

  if (enemyBoardScore <=0 && this.game.data.turn == "enemy") {
    this.gameOver = true;
  } else {
    this.gameOver = false;
  }
};
