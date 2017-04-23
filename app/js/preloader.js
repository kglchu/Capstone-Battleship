Battleship.GameState.init = function() {
  // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  this.game.physics.startSystem(Phaser.Physics.ARCADE);

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
  console.log("Player Score: " + this.game.data.playerScore + ': ' + this.game.data.loser);
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
  var index = Math.floor(Math.random() * (len - 1));
  board.matrix = this.matrix[index];
  board.index = index;

  return board;
  
};

Battleship.GameState.create = function() {
  this.game.stage.backgroundColor = '#4488cc';

  var board = this.positionData();
  this.spawnBoard(board);

  this.gun = this.game.add.sprite(this.game.width / 2, this.game.height - 10, 'player');
  this.gun.anchor.setTo(0.5, 0.5);

  this.bulletPool = this.game.add.group();
  for (var i = 0; i < this.NUMBER_OF_BULLETS; i++) {
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

