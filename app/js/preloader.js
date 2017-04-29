Battleship.GameState.init = function() {
  this.levels = {};
  this.ship2 = {};
  this.ship3 = {};
  this.ship4 = {};
  this.ship5 = {};
  this.ship6 = {};

  this.playerShips = {
    'ship2' : {},
    'ship3' : {},
    'ship4' : {},
    'ship5' : {},
    'ship6' : {},
  };

  this.enemyShips = {
    'ship2' : {},
    'ship3' : {},
    'ship4' : {},
    'ship5' : {},
    'ship6' : {},
  };

  this.gameOver = false;
  this.selectedCell = null;

  this.lastBulletShotAt = undefined;
  this.cells;
  this.playerCells;
  this.selectedCell = null;
  this.selectedCellStartPos = { x: 0, y: 0 };

  // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  this.game.physics.startSystem(Phaser.Physics.ARCADE);
  this.reservedBullets = 6;
  this.game.data.loser = "";

  this.matrix = [
    [ // board 1
      [0, 0, 0, 0, 0, 0, 0, 0, 2, 2],
      [0, 5, 5, 5, 5, 5, 0, 0, 0, 0],
      [0, 0, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 3, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 3, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 3, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 4, 4, 4, 4, 0, 0, 0],
    ],
    [ // board 2
      [0, 0, 0, 0, 0, 5, 0, 0, 2, 0],
      [0, 0, 0, 0, 0, 5, 0, 0, 2, 0],
      [0, 0, 0, 6, 0, 5, 0, 0, 0, 0],
      [0, 0, 0, 6, 0, 5, 0, 0, 0, 0],
      [0, 0, 0, 6, 0, 5, 0, 0, 0, 0],
      [0, 3, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 3, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 3, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 4, 4, 4, 4, 0, 0, 0],
    ],
    [ // board 3
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 5, 5, 5, 5, 5, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 6, 6, 6, 6, 6, 6, 0, 0],
      [0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 3, 0, 0, 0, 0, 2, 2, 0, 0],
      [0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 4, 4, 4, 4, 0, 0, 0],
    ],
    [ // board 4
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 5, 5, 5, 5, 5, 0, 0, 0, 0],
      [0, 0, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 6, 0, 0, 2, 0, 0, 0],
      [0, 0, 0, 6, 0, 0, 2, 0, 0, 0],
      [0, 3, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 3, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 3, 0, 6, 4, 4, 4, 4, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    [ // board 5
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 5, 5, 5, 5, 5, 0, 0, 0, 0],
      [0, 0, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 3, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 3, 0, 6, 0, 4, 4, 4, 4, 0],
      [0, 3, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 6, 0, 0, 0, 0, 0, 0],
      [2, 2, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    [ // board 6
      [0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
      [0, 5, 5, 5, 5, 5, 0, 0, 2, 0],
      [0, 0, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 3, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 3, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 3, 0, 6, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 4, 4, 4, 4, 0, 0, 0],
    ]
  ];

  this.levels.ships = [
    // board 1 ships
    {
      'ship2': {
        'angle': 0
      },
      'ship3': {
        'angle': 90
      },
      'ship4': {
        'angle': 0
      }, 
      'ship5': {
        'angle': 0
      },
      'ship6': {
        'angle': 90
      }
    },
    // board 2 ships
    {
      'ship2': {
        'angle': 90
      },
      'ship3': {
        'angle': 90
      },
      'ship4': {
        'angle': 0
      }, 
      'ship5': {
        'angle': 90
      },
      'ship6': {
        'angle': 90
      }
    },
    // board 3 ships
    {
      'ship2': {
        'angle': 0
      },
      'ship3': {
        'angle': 90
      },
      'ship4': {
        'angle': 0
      }, 
      'ship5': {
        'angle': 0
      },
      'ship6': {
        'angle': 0
      }
    },
    // board 4 ships
    {
      'ship2': {
        'angle': 90
      },
      'ship3': {
        'angle': 90
      },
      'ship4': {
        'angle': 0
      }, 
      'ship5': {
        'angle': 0
      },
      'ship6': {
        'angle': 90
      }
    },
    // board 5 ships
    {
      'ship2': {
        'angle': 0
      },
      'ship3': {
        'angle': 90
      },
      'ship4': {
        'angle': 0
      }, 
      'ship5': {
        'angle': 0
      },
      'ship6': {
        'angle': 90
      }
    },
    // board 6 ships
    {
      'ship2': {
        'angle': 90
      },
      'ship3': {
        'angle': 90
      },
      'ship4': {
        'angle': 0
      }, 
      'ship5': {
        'angle': 0
      },
      'ship6': {
        'angle': 90
      }
    }
  ];

  this.game.data.isShooting = true;

  // test to get game custom properties
  console.log("Player Score: " + this.game.data.playerScore);
};

Battleship.GameState.preload = function() {
  // images
  this.load.image('bullet', 'img/assets/gfx/rocket.png');
  this.load.image('player', 'img/assets/gfx/bullet.png');
  this.load.image('enemy', 'img/assets/gfx/player.png');
  this.load.image('ground', 'img/assets/gfx/ground.png');
  this.load.image('ship2', 'img/assets/gfx/Ship2.png');
  this.load.image('ship3', 'img/assets/gfx/Ship3.png');
  this.load.image('ship4', 'img/assets/gfx/Ship4.png');
  this.load.image('ship5', 'img/assets/gfx/Ship5.png');
  this.load.image('ship6', 'img/assets/gfx/Ship6.png');

  // sprite sheets
  this.load.spritesheet('explosion', 'img/assets/gfx/explosion.png', 128, 128);
  this.load.spritesheet('cell', 'img/assets/gfx/cells.png', 64, 64);

  // music
  this.load.audio('music', ['img/assets/audio/Battleship.mp3', 'img/assets/audio/Battleship.ogg']);
  // sound effects
  this.load.audio('explosion', 'img/assets/audio/Explosion Blast Large 05.mp3');
  this.load.audio('sunkenShip', 'img/assets/audio/Explosion Blast Debris Large 01.mp3');
  this.load.audio('shoot', 'img/assets/audio/Explosion Cannon Fire 01.mp3');
  this.load.audio('miss', 'img/assets/audio/Liquid Water Water Splash Hands Big Splash 02.mp3');
};

Battleship.GameState.positionData = function() {
  var board = {};
  var len = this.matrix.length;
  var index = this.game.rnd.integerInRange(0, (len-1));
  board.matrix = this.matrix[index];
  board.index = index;

  return board;
  
};

Battleship.GameState.create = function() {
  this.game.stage.backgroundColor = '#4488cc';

  // draws enemy board for player
  this.game.data.enemyBoard = this.positionData();
  this.spawnEnemyBoard(this.game.data.enemyBoard);

  // draws the player board for enemy
  setTimeout(function(){
    Battleship.game.data.playerBoard = Battleship.GameState.positionData();
    Battleship.GameState.spawnPlayerBoard(Battleship.game.data.playerBoard);
    Battleship.GameState.playerCells.visible = false;
  }, 1000)
  

  this.gun = this.game.add.sprite(this.game.width / 2, this.game.height - 10, 'player');
  this.gun.anchor.setTo(0.5, 0.5);

  this.bulletPool = this.game.add.group();
  for (var i = 0; i < this.reservedBullets; i++) {
    var bullet = this.game.add.sprite(0, 0, 'bullet');
    this.bulletPool.add(bullet);

    bullet.anchor.setTo(0.5, 0.5);

    this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
    bullet.kill();
  }

  // creates a banner message
  this.bannerMessage();

  // simulates mouse pointer in center of stage
  this.game.input.activePointer.x = this.game.width / 2;
  this.game.input.activePointer.y = this.game.height / 2;

  this.explosionGroup = this.game.add.group();
  this.hitGroup = this.game.add.group();
  this.hitEnemyGroup = this.game.add.group();

  this.music = this.add.audio('music');
  this.music.loopFull(0.4);
};

Battleship.GameState.bannerMessage = function() {
  // banner message for changing turns
  this.bar = this.add.graphics();
  this.bar.beginFill(0x000000, 0.2);
  this.bar.drawRect(0, this.game.world.centerY - 50, 800, 100);

  var style = { font: "bold 32px Arial", fill: "#FFF"};

  // Text for banner
  if (this.game.data.turn == "player") {
    this.msg = this.add.text(this.game.world.centerX, this.game.world.centerY, "Player's Turn!", style);
    this.msg.anchor.setTo(0.5);
    this.msg.setShadow(3, 3, 'rgba(0, 0, 0, 0.5', 2);
  } else if (this.game.data.turn == "enemy") {
    this.msg = this.add.text(this.game.world.centerX, this.game.world.centerY, "Enemy's Turn!", style);
    this.msg.anchor.setTo(0.5);
    this.msg.setShadow(3, 3, 'rgba(0, 0, 0, 0.5', 2);
  }

  this.bar.visible = false;
  this.msg.visible = false;
};

// placing the enemy ships
Battleship.GameState.shipPlacement = function (target, cell, ship, isVisible, index) {
  switch (ship) {

    case 2: 
      if (target.ship2.placed !== true) {
        if (this.levels.ships[index].ship2.angle === 90) {
          target.ship2.location = this.game.add.sprite(cell.x + 32, cell.y - 32, 'ship2');
        } else if (this.levels.ships[index].ship2.angle === 0) {
          target.ship2.location = this.game.add.sprite(cell.x - 32, cell.y - 32, 'ship2');
        }
        target.ship2.location.angle = this.levels.ships[index].ship2.angle;
        target.ship2.location.visible = isVisible;
        target.ship2.placed = true;
      }
      break;

    case 3: 
      if (target.ship3.placed !== true) {
        if (this.levels.ships[index].ship3.angle === 90) {
          target.ship3.location = this.game.add.sprite(cell.x + 32, cell.y - 32, 'ship3');
        } else if (this.levels.ships[index].ship3.angle === 0) {
          target.ship3.location = this.game.add.sprite(cell.x - 32, cell.y - 32, 'ship3');
        }
        target.ship3.location.angle = this.levels.ships[index].ship3.angle;
        target.ship3.location.visible = isVisible;
        target.ship3.placed = true;
      }
      break;

      case 4: 
      if (target.ship4.placed !== true) {
        if (this.levels.ships[index].ship4.angle === 90) {
          target.ship4.location = this.game.add.sprite(cell.x + 32, cell.y - 32, 'ship4');
        } else if (this.levels.ships[index].ship4.angle === 0) {
          target.ship4.location = this.game.add.sprite(cell.x - 32, cell.y - 32, 'ship4');
        }
        target.ship4.location.angle = this.levels.ships[index].ship4.angle;
        target.ship4.location.visible = isVisible;
        target.ship4.placed = true;
      }
      break;

      case 5: 
      if (target.ship5.placed !== true) {
        if (this.levels.ships[index].ship5.angle === 90) {
          target.ship5.location = this.game.add.sprite(cell.x + 32, cell.y - 32, 'ship5');
        } else if (this.levels.ships[index].ship5.angle === 0) {
          target.ship5.location = this.game.add.sprite(cell.x - 32, cell.y - 32, 'ship5');
        }
        target.ship5.location.angle = this.levels.ships[index].ship5.angle;
        target.ship5.location.visible = isVisible;
        target.ship5.placed = true;
      }
      break;

      case 6: 
      if (target.ship6.placed !== true) {
        if (this.levels.ships[index].ship6.angle === 90) {
          target.ship6.location = this.game.add.sprite(cell.x + 32, cell.y - 32, 'ship6');
        } else if (this.levels.ships[index].ship6.angle === 0) {
          target.ship6.location = this.game.add.sprite(cell.x - 32, cell.y - 32, 'ship6');
        }
        target.ship6.location.angle = this.levels.ships[index].ship6.angle;
        target.ship6.location.visible = isVisible;
        target.ship6.placed = true;
      }
      break;
  }
};

Battleship.GameState.switchTurn = function(player) {
  console.log("Player Score: " + this.game.data.playerScore);
  console.log("writing message...");
  // switches turn from current user [player -> enemy, enemy -> player]
  if (player === "player") {
    //this.music.stop();
    this.reservedBullets = 6;
    this.game.data.turn = "player";
    this.bannerMessage();
    this.viewMessage();
  } else if (player === "enemy") {
    //this.music.stop();
    this.reservedBullets = 6;
    this.game.data.turn = "enemy";
    this.bannerMessage();
    this.viewMessage();
  }
};

Battleship.GameState.viewMessage = function() {
  console.log("changing boards");
  if (this.game.data.turn == "player") {
    // change visibility of message before switching boards
    this.bar.visible = true;
    this.msg.visible = true;
    changeBoardsToEnemys(false);
    //this.cells.ignoreChildInput = false;
    setTimeout(function(){
      Battleship.GameState.bar.visible = false;
      Battleship.GameState.msg.visible = false;
    }, 3000);
    
  } else if (this.game.data.turn == "enemy") {
    // change visibility of message before switching boards
    this.bar.visible = true;
    this.msg.visible = true;
    changeBoardsToEnemys(true);
    //this.cells.ignoreChildInput = true;
    setTimeout(function(){
      Battleship.GameState.bar.visible = false;
      Battleship.GameState.msg.visible = false;
      Battleship.game.data.isShooting = false;
    }, 3000);
    
  }
};

function changeBoardsToEnemys(isEnemys) {
  Battleship.GameState.cells.visible = !isEnemys
  Battleship.GameState.playerCells.visible = isEnemys
  Battleship.GameState.hitGroup.visible = !isEnemys
  Battleship.GameState.hitEnemyGroup.visible = isEnemys
  // if players turn, show all sunken enemy ships and hide the rest along with the enemys board ships, else hide all enemy ships and show all players ships
  if (Battleship.GameState.cells.visible) {
    for (var i = 2; i < 7; i++) {
      Battleship.GameState.playerShips['ship' + i].location.visible = false;
      Battleship.GameState.enemyShips['ship' + i].location.visible = Battleship.GameState.enemyShips['ship' + i].sunken;
    }
  } else {
    for (var i = 2; i < 7; i++) {
      Battleship.GameState.playerShips['ship' + i].location.visible = true;
      Battleship.GameState.enemyShips['ship' + i].location.visible = false;
    }
  }
}

Battleship.GameState.GameOverPlayer = function() {
  var board = {};
  var boardScore = 0;

  board = this.cells.children;
  for (var i = 0; i < board.length; i++) {
    boardScore += board[i].marker;
  }

  if (boardScore <=0 && this.game.data.turn == "player") {
    this.gameOver = true;
    this.game.data.loser = "enemy";
  } else {
    this.gameOver = false;
  }
};
