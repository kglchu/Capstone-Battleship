Battleship.GameState.init = function() {
  // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  this.game.physics.startSystem(Phaser.Physics.ARCADE);
  this.reservedBullets = 6;
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

  this.game.data.loser = "";

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

  if (!this.game.data.playerBoard && this.game.data.turn == "enemy") {
    this.game.data.playerBoard = this.positionData();
    this.spawnBoard(this.game.data.playerBoard);
  } else if (this.game.data.turn == "enemy"){
    this.spawnBoard(this.game.data.playerBoard);
  }

  if (!this.game.data.enemyBoard && this.game.data.turn == "player") {
    this.game.data.enemyBoard = this.positionData();
    this.spawnBoard(this.game.data.enemyBoard);
   } else if (this.game.data.turn == "player"){
     this.spawnBoard(this.game.data.enemyBoard);
   }

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

  // simulates mouse pointer in center of stage
  this.game.input.activePointer.x = this.game.width / 2;
  this.game.input.activePointer.y = this.game.height / 2;

  this.explosionGroup = this.game.add.group();

  this.music = this.add.audio('music');
  this.music.loopFull(0.6);
};

Battleship.GameState.shipPlacement = function (cell, ship, index) {
  switch (ship) {

    case 2: 
      if (this.ship2.placed !== true) {
        if (this.levels.ships[index].ship2.angle === 90) {
          this.ship2.location = this.game.add.sprite(cell.x + 32, cell.y - 32, 'ship2');
        } else if (this.levels.ships[index].ship2.angle === 0) {
          this.ship2.location = this.game.add.sprite(cell.x - 32, cell.y - 32, 'ship2');
        }
        this.ship2.location.angle = this.levels.ships[index].ship2.angle;
        this.ship2.location.visible = false;
        this.ship2.placed = true;
      }
      break;

    case 3: 
      if (this.ship3.placed !== true) {
        if (this.levels.ships[index].ship3.angle === 90) {
          this.ship3.location = this.game.add.sprite(cell.x + 32, cell.y - 32, 'ship3');
        } else if (this.levels.ships[index].ship3.angle === 0) {
          this.ship3.location = this.game.add.sprite(cell.x - 32, cell.y - 32, 'ship3');
        }
        this.ship3.location.angle = this.levels.ships[index].ship3.angle;
        this.ship3.location.visible = false;
        this.ship3.placed = true;
      }
      break;

      case 4: 
      if (this.ship4.placed !== true) {
        if (this.levels.ships[index].ship4.angle === 90) {
          this.ship4.location = this.game.add.sprite(cell.x + 32, cell.y - 32, 'ship4');
        } else if (this.levels.ships[index].ship4.angle === 0) {
          this.ship4.location = this.game.add.sprite(cell.x - 32, cell.y - 32, 'ship4');
        }
        this.ship4.location.angle = this.levels.ships[index].ship4.angle;
        this.ship4.location.visible = false;
        this.ship4.placed = true;
      }
      break;

      case 5: 
      if (this.ship5.placed !== true) {
        if (this.levels.ships[index].ship5.angle === 90) {
          this.ship5.location = this.game.add.sprite(cell.x + 32, cell.y - 32, 'ship5');
        } else if (this.levels.ships[index].ship5.angle === 0) {
          this.ship5.location = this.game.add.sprite(cell.x - 32, cell.y - 32, 'ship5');
        }
        this.ship5.location.angle = this.levels.ships[index].ship5.angle;
        this.ship5.location.visible = false;
        this.ship5.placed = true;
      }
      break;

      case 6: 
      if (this.ship6.placed !== true) {
        if (this.levels.ships[index].ship6.angle === 90) {
          this.ship6.location = this.game.add.sprite(cell.x + 32, cell.y - 32, 'ship6');
        } else if (this.levels.ships[index].ship6.angle === 0) {
          this.ship6.location = this.game.add.sprite(cell.x - 32, cell.y - 32, 'ship6');
        }
        this.ship6.location.angle = this.levels.ships[index].ship6.angle;
        this.ship6.location.visible = false;
        this.ship6.placed = true;
      }
      break;
  }
};

Battleship.GameState.switchTurn = function() {
  console.log("Player Score: " + this.game.data.playerScore);
  // switches turn from current user [player -> enemy, enemy -> player]
  if (this.game.data.turn == "player") {
    this.music.stop();
    this.game.data.turn = "enemy";
    this.game.state.start("TurnState");
  } else {
    this.music.stop();
    this.game.data.turn = "player";
    this.game.state.start("TurnState");
  }
};

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
