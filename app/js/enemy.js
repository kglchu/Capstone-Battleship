Battleship.GameState.enemyHit = function(cell) {
  // mark off enemy ship
  cell.hasEnemy = false;
  cell.frame = 1;
  this.game.data.currentEnemyBoard.cellStatus = cell.frame;
  // loads and plays explosion audio when hit
  this.shipHit = this.add.audio('explosion');
  this.shipHit.play();
  if (this.reservedBullets === 0) {
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
  this.game.data.currentEnemyBoard.cellStatus = cell.frame;
  // loads and plays miss audio
  this.missEnemy = this.add.audio('miss');
  this.missEnemy.play();
  if (this.reservedBullets === 0) {
    this.switchTurn();
  }
};

Battleship.GameState.simulateShooting = function(cellGroup) {

    this.selectedCell;
    this.game.data.isShooting = true;
    setTimeout(function() {  
        Battleship.GameState.selectedCell = cellGroup.children[Battleship.GameState.game.rnd.integerInRange(0, 99)];
        if (Battleship.GameState.selectedCell == cellGroup.children[Battleship.GameState.selectedCell]) {
            Battleship.GameState.selectedCell = cellGroup.children[Battleship.GameState.game.rnd.integerInRange(0, 99)];
        }
        if (Battleship.game.data.turn == "enemy") {
           Battleship.GameState.gun.rotation = Battleship.GameState.game.physics.arcade.angleBetween(Battleship.GameState.gun, Battleship.GameState.selectedCell);
           Battleship.GameState.attackCell(Battleship.GameState.selectedCell);
        } }, 1000);

    setTimeout(function() { 
        Battleship.GameState.selectedCell = cellGroup.children[Battleship.GameState.game.rnd.integerInRange(0, 99)];
        if (Battleship.GameState.selectedCell == cellGroup.children[Battleship.GameState.selectedCell]) {
            Battleship.GameState.selectedCell = cellGroup.children[Battleship.GameState.game.rnd.integerInRange(0, 99)];
        }
        if (Battleship.game.data.turn == "enemy") {
           Battleship.GameState.gun.rotation = Battleship.GameState.game.physics.arcade.angleBetween(Battleship.GameState.gun, Battleship.GameState.selectedCell);
           Battleship.GameState.attackCell(Battleship.GameState.selectedCell);
        } }, 2000);

    setTimeout(function() { 
        Battleship.GameState.selectedCell = cellGroup.children[Battleship.GameState.game.rnd.integerInRange(0, 99)];
        if (Battleship.GameState.selectedCell == cellGroup.children[Battleship.GameState.selectedCell]) {
            Battleship.GameState.selectedCell = cellGroup.children[Battleship.GameState.game.rnd.integerInRange(0, 99)];
        }
        if (Battleship.game.data.turn == "enemy") {
           Battleship.GameState.gun.rotation = Battleship.GameState.game.physics.arcade.angleBetween(Battleship.GameState.gun, Battleship.GameState.selectedCell);
           Battleship.GameState.attackCell(Battleship.GameState.selectedCell);
        } }, 3000);

    setTimeout(function() { 
        Battleship.GameState.selectedCell = cellGroup.children[Battleship.GameState.game.rnd.integerInRange(0, 99)];
        if (Battleship.GameState.selectedCell == cellGroup.children[Battleship.GameState.selectedCell]) {
            Battleship.GameState.selectedCell = cellGroup.children[Battleship.GameState.game.rnd.integerInRange(0, 99)];
        }
        if (Battleship.game.data.turn == "enemy") {
           Battleship.GameState.gun.rotation = Battleship.GameState.game.physics.arcade.angleBetween(Battleship.GameState.gun, Battleship.GameState.selectedCell);
           Battleship.GameState.attackCell(Battleship.GameState.selectedCell);
        } }, 4000);

    setTimeout(function() { 
        Battleship.GameState.selectedCell = cellGroup.children[Battleship.GameState.game.rnd.integerInRange(0, 99)];
        if (Battleship.GameState.selectedCell == cellGroup.children[Battleship.GameState.selectedCell]) {
            Battleship.GameState.selectedCell = cellGroup.children[Battleship.GameState.game.rnd.integerInRange(0, 99)];
        }
        if (Battleship.game.data.turn == "enemy") {
           Battleship.GameState.gun.rotation = Battleship.GameState.game.physics.arcade.angleBetween(Battleship.GameState.gun, Battleship.GameState.selectedCell);
           Battleship.GameState.attackCell(Battleship.GameState.selectedCell);
        } }, 5000);

    setTimeout(function(){ 
        Battleship.GameState.selectedCell = cellGroup.children[Battleship.GameState.game.rnd.integerInRange(0, 99)];
        if (Battleship.GameState.selectedCell == cellGroup.children[Battleship.GameState.selectedCell]) {
            Battleship.GameState.selectedCell = cellGroup.children[Battleship.GameState.game.rnd.integerInRange(0, 99)];
        }
        if (Battleship.game.data.turn == "enemy") {
           Battleship.GameState.gun.rotation = Battleship.GameState.game.physics.arcade.angleBetween(Battleship.GameState.gun, Battleship.GameState.selectedCell);
           Battleship.GameState.attackCell(Battleship.GameState.selectedCell);
        }
        setTimeout(function() {
            Battleship.GameState.switchTurn();
        }, 500);
        Battleship.game.data.isShooting = false;

    }, 6000);
};

Battleship.GameState.targetShot = function() {
  // Enforce a short delay between shots by recording
  // the time that each bullet is shot
  if(this.lastBulletShotAt === undefined) this.lastBulletShotAt = 0;
  if(this.game.time.now - this.lastBulletShotAt < this.SHOT_DELAY + this.game.rnd.integerInRange(250, 500)) return;
  this.lastBulletShotAt = this.game.time.now;

  // get dead bullet from the pool
  var bullet = this.bulletPool.getFirstDead();

  // if there aren't any bullets in pool, then don't shoot
  if (bullet === null || bullet === undefined) return;

  bullet.revive();

  // Bullets will kill themselves when they leave world bounds
  bullet.checkWorldBounds = true;
  bullet.outOfBoundsKill = true;

  bullet.reset(this.gun.x, this.gun.y);
  bullet.rotation = this.gun.rotation;

  // Shoot bullet in the given coordinates
  bullet.body.velocity.x = Math.cos(bullet.rotation) * this.BULLET_SPEED;
  bullet.body.velocity.y = Math.sin(bullet.rotation) * this.BULLET_SPEED;

  this.cannonShot = this.add.audio('shoot');
  this.cannonShot.play();
};

Battleship.GameState.attackCell = function(cell) {
    if(cell.frame === 0) {
        // shoot bullet at selected cell from the simulated shooting method
        this.targetShot();
        // selected cell physics
        this.game.physics.enable(cell, Phaser.Physics.ARCADE);
        cell.body.immovable = true;
        cell.body.allowGravity = false;
        if (cell.hasEnemy) {
          cell.enemyContact = cell.marker;
          cell.marker = 0;
        }
    }
};

Battleship.GameState.checkEnemyCollision = function() {
    this.game.physics.arcade.collide(this.bulletPool, this.playerCells, function(bullet, cell) {
    // trigger explosion
      bullet.kill();

      if (cell.hasEnemy) {
        // enemy was hit
        this.getExplosion(cell, cell.posX, cell.posY);
        this.enemyHit(cell);
        // check for sunken ship
        this.sunkEnemyBattleship(cell);
        this.game.data.playerScore += cell.enemyContact;
      } else {
          // there is nothing in the cell
          this.miss(cell);
      }

      // destroy gun and ships, reset board
      if (this.gameOver) {
        this.cells.forEach(function (item) {
          item.frame = 0;
        }, this);

        this.music.stop();
        this.gun.destroy();
        this.ship2.location.destroy();
        this.ship3.location.destroy();
        this.ship4.location.destroy();
        this.ship5.location.destroy();
        this.ship6.location.destroy();
        this.game.data.loser = "player";
        this.game.state.start("GameOverState");
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
