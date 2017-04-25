// TODO Keep 'memory' of board for both player and enemy

Battleship.GameState.spawnBoard = function(board) {
  this.BOARD_COLS = Math.floor(this.game.world.width / this.CELL_SIZE_SPACED);
  this.BOARD_ROWS = Math.floor((this.game.world.height / this.CELL_SIZE_SPACED) - 1);

  this.cells = this.game.add.group();
  this.playerCells = this.game.add.group();


  // used to check if ship is sunk by adding the hit score(enemyContact)
  this.cells.ship2 = 0;
  this.cells.ship3 = 0;
  this.cells.ship4 = 0;
  this.cells.ship5 = 0;
  this.cells.ship6 = 0;

  // sets current visibility to false
  this.ship2.placed = false;
  this.ship3.placed = false;
  this.ship4.placed = false;
  this.ship5.placed = false;
  this.ship6.placed = false;

  // build the board for player to attack enemy
  if (this.game.data.turn == "player") {
    for (var col = 0; col < this.BOARD_COLS; col++) {
      for (var row = 0; row < this.BOARD_ROWS; row++) {
        var cell = this.cells.create((col * this.CELL_SIZE_SPACED) + this.CELL_SIZE_SPACED/2 + 2, (row * this.CELL_SIZE_SPACED + this.CELL_SIZE/2 + 2), 'cell', 0);
        cell.anchor.setTo(0.5, 0.5);
        cell.name = 'cell: ' + col.toString() + 'x' + row.toString();
        cell.inputEnabled = true;
        cell.enemyContact = 0; // var used to represent successful hit
        cell.marker = board.matrix[row][col];
        this.shipPlacement(cell, cell.marker, board.index);
        cell.posX = cell.x;
        cell.posY = cell.y;
        // check to see if there is a marker in cell
        cell.hasEnemy = cell.marker > 0;
        // click events
        cell.events.onInputDown.add(this.selectCell, this);
      }
    }
    this.game.data.currentEnemyBoard = this.cells;
    // build board for enemy to attack
  } else if (this.game.data.turn == "enemy") { // pCell = player board cells
      for (var Col = 0; Col < this.BOARD_COLS; Col++) {
      for (var Row = 0; Row < this.BOARD_ROWS; Row++) {
        var pCell = this.playerCells.create((Col * this.CELL_SIZE_SPACED) + this.CELL_SIZE_SPACED/2 + 2, (Row * this.CELL_SIZE_SPACED + this.CELL_SIZE/2 + 2), 'cell', 0);
        pCell.anchor.setTo(0.5, 0.5);
        pCell.name = 'cell: ' + Col.toString() + 'x' + Row.toString();
        pCell.enemyContact = 0; // var used to represent successful hit
        pCell.marker = board.matrix[Row][Col];
        this.shipPlacement(pCell, pCell.marker, board.index);
        pCell.posX = pCell.x;
        pCell.posY = pCell.y;
        // check to see if there is a marker in cell
        pCell.hasEnemy = pCell.marker > 0;
      }
    }
    this.game.data.currentPlayerBoard = this.playerCells;
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
  this.GameOverPlayer();
  this.GameOverEnemy();
  if (this.game.data.turn == "player") {
    this.gun.rotation = this.game.physics.arcade.angleToPointer(this.gun);
  } else if (this.game.data.turn == "enemy"){
    if (!this.game.data.isShooting) this.simulateShooting(this.playerCells);
  }

  // collision method
  if (this.game.data.turn == "player") {
    this.checkPlayerCollision();
  } else if (this.game.data.turn == "enemy") {
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

Battleship.GameState.selectCell = function(cell) {

  if (cell.input.pointerOver && cell.frame === 0 && this.game.data.turn == "player") {
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

    // enemy was hit
    if (cell.hasEnemy) {
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
      this.game.data.playerScore += Math.floor(Math.random() * (36 - 4)) + 4;
      console.log("Player Score: " + this.game.data.playerScore);
      this.game.state.start("GameOverState");
    }

    if(cell.body.enable) {
      cell.body.enable = false;
    }
  }, null, this);
};