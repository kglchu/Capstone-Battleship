// TODO Keep 'memory' of board for both player and enemy

Battleship.GameState.spawnEnemyBoard = function(board) {
  this.BOARD_COLS = 10; //Math.floor(this.game.world.width / this.CELL_SIZE_SPACED);
  this.BOARD_ROWS = 10; //Math.floor((this.game.world.height / this.CELL_SIZE_SPACED) - 1);

  this.cells = this.game.add.group();

  // resetting score when hitting the respective ship
  this.cells.ship2 = 0;
  this.cells.ship3 = 0;
  this.cells.ship4 = 0;
  this.cells.ship5 = 0;
  this.cells.ship6 = 0;

  // sets enemy ships visibility to false for enemy board
  this.enemyShips.ship2.placed = false;
  this.enemyShips.ship3.placed = false;
  this.enemyShips.ship4.placed = false;
  this.enemyShips.ship5.placed = false;
  this.enemyShips.ship6.placed = false;

  for (var col = 0; col < this.BOARD_COLS; col++) {
    for (var row = 0; row < this.BOARD_ROWS; row++) {
      var cell = this.cells.create((col * this.CELL_SIZE_SPACED) + this.CELL_SIZE_SPACED/2 + 2, (row * this.CELL_SIZE_SPACED + this.CELL_SIZE/2 + 64), 'cell', 0);
      cell.anchor.setTo(0.5, 0.5);
      cell.name = 'cell: ' + col.toString() + 'x' + row.toString();
      cell.inputEnabled = true;
      cell.enemyContact = 0; // var used to represent successful hit
      cell.marker = board.matrix[row][col];
      this.shipPlacement(this.enemyShips, cell, cell.marker, false, board.index);
      cell.posX = cell.x;
      cell.posY = cell.y;
      // check to see if there is a marker in cell
      cell.hasEnemy = cell.marker > 0;
      // click events
      cell.events.onInputDown.add(this.selectCell, this);
    }
  }
  this.game.data.currentEnemyBoard = this.cells;
};

// checks for any player ship that has sunk
Battleship.GameState.sunkPlayerBattleship = function(cell) {
    // check to see if all markers of the enemy have been hit
    switch (cell.enemyContact)
    {
        case 2:
            this.playerCells.ship2 += cell.enemyContact;
            if (this.playerCells.ship2 === 4) {
                this.sunkShip = this.add.audio('sunkenShip');
                this.sunkShip.play();
                //this.playerShips.ship2.location.visible = true;
                this.playerShips.ship2.sunken = true;
                return true;
            }
            return false;

        case 3:
            this.playerCells.ship3 += cell.enemyContact;
            if (this.playerCells.ship3 === 9) {
                this.sunkShip = this.add.audio('sunkenShip');
                this.sunkShip.play();
                //this.playerShips.ship3.location.visible = true;
                this.playerShips.ship2.sunken = true;
                return true;
            }
            return false;

        case 4:
            this.playerCells.ship4 += cell.enemyContact;
            if (this.playerCells.ship4 === 16) {
                this.sunkShip = this.add.audio('sunkenShip');
                this.sunkShip.play();
                //this.playerShips.ship4.location.visible = true;
                this.playerShips.ship2.sunken = true;
                return true;
            }
            return false;

        case 5:
            this.playerCells.ship5 += cell.enemyContact;
            if (this.playerCells.ship5 === 25) {
                this.sunkShip = this.add.audio('sunkenShip');
                this.sunkShip.play();
                //this.playerShips.ship5.location.visible = true;
                this.playerShips.ship2.sunken = true;
                return true;
            }
            return false;

        case 6:
            this.playerCells.ship6 += cell.enemyContact;
            if (this.playerCells.ship6 === 36) {
                this.sunkShip = this.add.audio('sunkenShip');
                this.sunkShip.play();
                //this.playerShips.ship6.location.visible = true;
                this.playerShips.ship2.sunken = true;
                return true;
            }
            return false;

        default: 
        return false;
    }

    // checks if enemy lost
    if (this.playerShips.ship2.sunken === true && this.playerShips.ship3.sunken === true && this.playerShips.ship4.sunken === true && this.playerShips.ship5.sunken === true && this.playerShips.ship6.sunken === true) {
        this.game.data.loser = "player";
    }
};

Battleship.GameState.shootBullet = function() {
  // Enforce a short delay between shots by recording
  // the time that each bullet is shot
  if(this.lastBulletShotAt === undefined) this.lastBulletShotAt = 0;
  if(this.game.time.now - this.lastBulletShotAt < this.SHOT_DELAY) return;
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

  this.reservedBullets -= 1;
};

// Update method is called every frame
Battleship.GameState.update = function() {
  //Aim the gun at mouse pointer
  
  
  if (this.game.data.turn == "player") {
    this.gun.rotation = this.game.physics.arcade.angleToPointer(this.gun);
  } else if (this.game.data.turn == "enemy"){
    console.log("enemy turn");
    if (!this.game.data.isShooting) {
      console.log("enemy shooting");
      this.simulateShooting(this.playerCells);
    }
  }

  // collision method
  if (this.game.data.turn == "player") {
    this.GameOverPlayer();
    this.checkPlayerCollision();
  } else if (this.game.data.turn == "enemy") {
    this.GameOverEnemy();
    this.checkEnemyCollision();
  }
};

Battleship.GameState.getExplosion = function(cell, x, y) {
  var explosion = this.explosionGroup.getFirstDead();

  if (explosion === null) {
    explosion = this.game.add.sprite(0, 0, 'explosion');
    explosion.anchor.setTo(0.5, 0.5);

    var animation = explosion.animations.add('boom', [0, 0, 1, 2, 3], 60, false);
    animation.killOnComplete = true;

    this.explosionGroup.add(explosion);
  }

  explosion.revive();

  explosion.x = x;
  explosion.y = y;

  explosion.angle = this.game.rnd.integerInRange(0, 360);

  explosion.animations.play('boom');

  return explosion;
};

Battleship.GameState.getHitLocation = function (target,cell, x, y) {
//get the first dead explosion from the explosionGroup
    var hit = target === "player" ? this.hitGroup.getFirstDead() : this.hitEnemyGroup.getFirstDead();

    //if ther aren't any available, create a new one
    if( hit === null)
    {
        hit = this.game.add.sprite(0, 0, 'cell', 1);
        hit.anchor.setTo(0.5, 0.5);

        //add explosion sprite to the group
        if(target === "player") {
          this.hitGroup.add(hit);
        } else {
          this.hitEnemyGroup.add(hit);
        }
        
        
    }

    hit.revive();

    //move the explosion to the given coordinates
    hit.x = x;
    hit.y = y;

    // Return the explosion itself in case we want to do anything else with it
    return hit;

};

Battleship.GameState.selectCell = function(cell) {
  // enemy grabbing cell and starting the shoot bullet method
  if(cell.frame === 0 && this.game.data.turn == "enemy") {
      // shoot bullet at selected cell from the simulated shooting method
      this.shootBullet();
      // selected cell physics
      this.game.physics.enable(cell, Phaser.Physics.ARCADE);
      cell.body.immovable = true;
      cell.body.allowGravity = false;
      if (cell.hasEnemy) {
        cell.enemyContact = cell.marker;
        cell.marker = 0;
      }
      // player shoots at cell as long as mouse pointer hovers over it
    } else if (cell.input.pointerOver && cell.frame === 0 && this.game.data.turn == "player" && this.reservedBullets > 0) {
    // shoot bullet if touching or in bounds of cell
    this.shootBullet();
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

Battleship.GameState.checkPlayerCollision = function() {
  this.game.physics.arcade.collide(this.bulletPool, this.cells, function(bullet, cell) {
  // trigger explosion
  bullet.kill();
    // disable all other cells to collide with selected cell
    if(cell.body.enable) {
      cell.body.enable = false;
    }
    // enemy was hit
    if (cell.hasEnemy) {
      this.getExplosion(cell, cell.posX, cell.posY);
      this.getHitLocation("player",cell, cell.x, cell.y);
      this.enemyHit(cell);
      // check for sunken ship
      this.sunkEnemyBattleship(cell);
      this.game.data.playerScore += cell.enemyContact;
    } else {
        // there is nothing in the cell
        this.miss(cell);
    }

    if (this.reservedBullets === 0) {
      console.log("switching turn from player");
      setTimeout(function() {
        Battleship.GameState.switchTurn('enemy');
      }, 500);
    }

    // destroy gun and ships, reset board
    if (this.gameOver) {
      this.cells.forEach(function (item) {
        item.frame = 0;
      }, this);

      this.music.destroy();
      this.gun.destroy();
      this.enemyShips.ship2.location.destroy();
      this.enemyShips.ship3.location.destroy();
      this.enemyShips.ship4.location.destroy();
      this.enemyShips.ship5.location.destroy();
      this.enemyShips.ship6.location.destroy();
      this.game.data.playerScore += Math.floor(Math.random() * (36 - 4)) + 4;
      console.log("Player Score: " + this.game.data.playerScore);
      this.game.state.start("GameOverState");
    }
  }, null, this);
};