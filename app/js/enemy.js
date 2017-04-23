Battleship.GameState.enemyHit = function(cell) {
  // mark off enemy ship
  cell.hasEnemy = false;
  cell.frame = 1;
  // loads and plays explosion audio when hit
  this.shipHit = this.add.audio('explosion');
  this.shipHit.play();
  if (this.NUMBER_OF_BULLETS === 0) {
    this.NUMBER_OF_BULLETS = 6;
    this.switchTurn();
  }
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
                this.ship2.location.visible = true;
            }
        break;

        case 3:
            this.cells.ship3 += cell.enemyContact;
            if (this.cells.ship3 === 9) {
                this.sunkShip = this.add.audio('sunkenShip');
                this.sunkShip.play();
                this.ship3.location.visible = true;
            }
        break;

        case 4:
            this.cells.ship4 += cell.enemyContact;
            if (this.cells.ship4 === 16) {
                this.sunkShip = this.add.audio('sunkenShip');
                this.sunkShip.play();
                this.ship4.location.visible = true;
            }
        break;

        case 5:
            this.cells.ship5 += cell.enemyContact;
            if (this.cells.ship5 === 25) {
                this.sunkShip = this.add.audio('sunkenShip');
                this.sunkShip.play();
                this.ship5.location.visible = true;
            }
        break;

        case 6:
            this.cells.ship6 += cell.enemyContact;
            if (this.cells.ship6 === 36) {
                this.sunkShip = this.add.audio('sunkenShip');
                this.sunkShip.play();
                this.ship6.location.visible = true;
            }
        break;
    }

    // checks if enemy lost

    if (this.ship2.location.visible === true && this.ship3.location.visible === true && this.ship4.location.visible === true && this.ship5.location.visible === true && this.ship6.location.visible === true) {
        this.game.data.loser = "enemy";
        this.ship2.location.visible = false;
        this.ship3.location.visible = false;
        this.ship4.location.visible = false;
        this.ship5.location.visible = false;
        this.ship6.location.visible = false;
    }
};

Battleship.GameState.miss = function(cell) {
  // mark a miss sprite on the board
  cell.frame = 2;
  // loads and plays miss audio
  this.missEnemy = this.add.audio('miss');
  this.missEnemy.play();
  if (this.NUMBER_OF_BULLETS === 0) {
    this.NUMBER_OF_BULLETS = 6;
    this.switchTurn();
  }
};