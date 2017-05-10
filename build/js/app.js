function changeBoardsToEnemys(t){if(Battleship.GameState.score.visible=!t,Battleship.GameState.cells.visible=!t,Battleship.GameState.hitGroup.visible=!t,Battleship.GameState.enemySmokeGroup.visible=!t,setTimeout(function(){Battleship.GameState.ammo.setAll("visible",!t)},500),Battleship.GameState.playerCells.visible=t,setTimeout(function(){Battleship.GameState.enemyAmmo.setAll("visible",t)},500),Battleship.GameState.hitEnemyGroup.visible=t,Battleship.GameState.playerSmokeGroup.visible=t,Battleship.GameState.cells.visible)for(var e=2;e<7;e++)Battleship.GameState.playerShips["ship"+e].location.visible=!1,Battleship.GameState.enemyShips["ship"+e].location.visible=Battleship.GameState.enemyShips["ship"+e].sunken;else for(var a=2;a<7;a++)Battleship.GameState.playerShips["ship"+a].location.visible=!0,Battleship.GameState.enemyShips["ship"+a].location.visible=!1}function callShootAgain(t){Battleship.GameState.simulateShooting(t)}var Battleship=Battleship||{};Battleship.GameState=Battleship.GameState||{},Battleship.GameState.SHOT_DELAY=200,Battleship.GameState.BULLET_SPEED=850,Battleship.GameState.NUMBER_OF_BULLETS=1,Battleship.GameState.BOARD_COLS,Battleship.GameState.BOARD_ROWS,Battleship.GameState.CELL_SIZE=64,Battleship.GameState.CELL_SPACING=2,Battleship.GameState.CELL_SIZE_SPACED=Battleship.GameState.CELL_SIZE+Battleship.GameState.CELL_SPACING,Battleship.HomeState=Battleship.HomeState||{},Battleship.HomeState.intro_text,Battleship.HomeState.init=function(){},Battleship.HomeState.preload=function(){},Battleship.HomeState.create=function(){this.game.stage.backgroundColor="#4488cc";var t=this.game.add.graphics();t.beginFill(0,.2),t.drawRect(0,this.game.world.centerY-50,800,100);var e={font:"bold 32px Arial",fill:"#fff",boundsAlignH:"center",boundsAlignV:"middle"};this.intro_text=this.game.add.text(0,0,"Tap Screen to Start",e),this.intro_text.setShadow(3,3,"rgba(0, 0, 0, 0.5)",2),this.intro_text.setTextBounds(-75,this.game.world.centerY-50,800,100),t.inputEnabled=!0,t.events.onInputDown.add(this.gameStart,this)},Battleship.HomeState.gameStart=function(t){this.game.data.turn="player",this.game.state.start("GameState")},Battleship.HomeState.shutdown=function(){console.log("shutdown homestate")},Battleship.GameOverState=Battleship.GameOverState||{},Battleship.GameOverState.intro_text,Battleship.GameOverState.init=function(){},Battleship.GameOverState.preload=function(){},Battleship.GameOverState.create=function(){this.game.stage.backgroundColor="#222";var t=this.game.add.graphics();t.beginFill(0,.2),t.drawRect(0,this.game.world.centerY-50,800,100);var e={font:"bold 32px Arial",fill:"#fff",boundsAlignH:"center",boundsAlignV:"middle"};"player"==this.game.data.loser?(this.intro_text=this.game.add.text(0,0,"You Lost! Tap to Restart",e),this.intro_text.setShadow(3,3,"rgba(0, 0, 0, 0.5)",2),this.intro_text.setTextBounds(-75,this.game.world.centerY-50,800,100)):"enemy"==this.game.data.loser&&(this.intro_text=this.game.add.text(0,0,"You Win! Tap to Restart",e),this.intro_text.setShadow(3,3,"rgba(0, 0, 0, 0.5)",2),this.intro_text.setTextBounds(-75,this.game.world.centerY-50,800,100)),t.inputEnabled=!0,t.events.onInputDown.add(this.gameStart,this)},Battleship.GameOverState.gameStart=function(){this.game.state.start("GameState")},Battleship.GameOverState.shutdown=function(){console.log("shutdown game over")},Battleship.GameState.init=function(){this.game.data.turn="player",this.scoreText="Player Score: ",this.ammo=null,this.levels={},this.ship2={},this.ship3={},this.ship4={},this.ship5={},this.ship6={},this.playerShips={ship2:{},ship3:{},ship4:{},ship5:{},ship6:{}},this.enemyShips={ship2:{},ship3:{},ship4:{},ship5:{},ship6:{}},this.gameOver=!1,this.selectedCell=null,this.lastBulletShotAt=void 0,this.cells,this.playerCells,this.selectedCell=null,this.selectedCellStartPos={x:0,y:0},this.game.physics.startSystem(Phaser.Physics.ARCADE),this.reservedBullets=6,this.game.data.loser=null,this.game.isReady=!1,this.matrix=[[[0,0,0,0,0,0,0,0,2,2],[0,5,5,5,5,5,0,0,0,0],[0,0,0,6,0,0,0,0,0,0],[0,0,0,6,0,0,0,0,0,0],[0,0,0,6,0,0,0,0,0,0],[0,3,0,6,0,0,0,0,0,0],[0,3,0,6,0,0,0,0,0,0],[0,3,0,6,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,4,4,4,4,0,0,0]],[[0,0,0,0,0,5,0,0,2,0],[0,0,0,0,0,5,0,0,2,0],[0,0,0,6,0,5,0,0,0,0],[0,0,0,6,0,5,0,0,0,0],[0,0,0,6,0,5,0,0,0,0],[0,3,0,6,0,0,0,0,0,0],[0,3,0,6,0,0,0,0,0,0],[0,3,0,6,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,4,4,4,4,0,0,0]],[[0,0,0,0,0,0,0,0,0,0],[0,5,5,5,5,5,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,6,6,6,6,6,6,0,0],[0,3,0,0,0,0,0,0,0,0],[0,3,0,0,0,0,2,2,0,0],[0,3,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,4,4,4,4,0,0,0]],[[0,0,0,0,0,0,0,0,0,0],[0,5,5,5,5,5,0,0,0,0],[0,0,0,6,0,0,0,0,0,0],[0,0,0,6,0,0,2,0,0,0],[0,0,0,6,0,0,2,0,0,0],[0,3,0,6,0,0,0,0,0,0],[0,3,0,6,0,0,0,0,0,0],[0,3,0,6,4,4,4,4,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]],[[0,0,0,0,0,0,0,0,0,0],[0,5,5,5,5,5,0,0,0,0],[0,0,0,6,0,0,0,0,0,0],[0,3,0,6,0,0,0,0,0,0],[0,3,0,6,0,4,4,4,4,0],[0,3,0,6,0,0,0,0,0,0],[0,0,0,6,0,0,0,0,0,0],[0,0,0,6,0,0,0,0,0,0],[2,2,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]],[[0,0,0,0,0,0,0,0,2,0],[0,5,5,5,5,5,0,0,2,0],[0,0,0,6,0,0,0,0,0,0],[0,0,0,6,0,0,0,0,0,0],[0,0,0,6,0,0,0,0,0,0],[0,3,0,6,0,0,0,0,0,0],[0,3,0,6,0,0,0,0,0,0],[0,3,0,6,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,4,4,4,4,0,0,0]]],this.levels.ships=[{ship2:{angle:0},ship3:{angle:90},ship4:{angle:0},ship5:{angle:0},ship6:{angle:90}},{ship2:{angle:90},ship3:{angle:90},ship4:{angle:0},ship5:{angle:90},ship6:{angle:90}},{ship2:{angle:0},ship3:{angle:90},ship4:{angle:0},ship5:{angle:0},ship6:{angle:0}},{ship2:{angle:90},ship3:{angle:90},ship4:{angle:0},ship5:{angle:0},ship6:{angle:90}},{ship2:{angle:0},ship3:{angle:90},ship4:{angle:0},ship5:{angle:0},ship6:{angle:90}},{ship2:{angle:90},ship3:{angle:90},ship4:{angle:0},ship5:{angle:0},ship6:{angle:90}}],this.game.data.isShooting=!0},Battleship.GameState.preload=function(){this.load.image("bullet","img/assets/gfx/missile.png"),this.load.image("cannonBase","img/assets/gfx/base.png"),this.load.image("enemy","img/assets/gfx/player.png"),this.load.image("ground","img/assets/gfx/ground.png"),this.load.image("ship2","img/assets/gfx/Ship2.png"),this.load.image("ship3","img/assets/gfx/Ship3.png"),this.load.image("ship4","img/assets/gfx/Ship4.png"),this.load.image("ship5","img/assets/gfx/Ship5.png"),this.load.image("ship6","img/assets/gfx/Ship6.png"),this.load.spritesheet("explosion","img/assets/gfx/explosion.png",128,128),this.load.spritesheet("cell","img/assets/gfx/cells.png",64,64),this.load.spritesheet("cannon","img/assets/gfx/cannon_sprites.png",96,30),this.load.spritesheet("smoke","img/assets/gfx/smoke_spritesheet.png",21,52),this.load.spritesheet("fire","img/assets/gfx/fire_spritesheet.png",22,40),this.load.audio("music",["img/assets/audio/Battleship.mp3","img/assets/audio/Battleship.ogg"]),this.load.audio("explosion","img/assets/audio/Explosion Blast Large 05.mp3"),this.load.audio("sunkenShip","img/assets/audio/Explosion Blast Debris Large 01.mp3"),this.load.audio("shoot","img/assets/audio/Explosion Cannon Fire 01.mp3"),this.load.audio("miss","img/assets/audio/Liquid Water Water Splash Hands Big Splash 02.mp3")},Battleship.GameState.positionData=function(t){var e={},a=this.matrix.length,s=null;return s=Math.floor(Math.random()*(a-1)),"player"===t?s!==this.game.data.enemyBoardIndex?this.game.data.playerBoardIndex=s:this.positionData("player"):s!==this.game.data.playerBoardIndex?this.game.data.enemyBoardIndex=s:this.positionData("enemy"),e.matrix=this.matrix[s],e.index=s,s=null,e},Battleship.GameState.create=function(){this.game.stage.backgroundColor="#4488cc",this.game.data.enemyBoard=this.positionData("player"),console.log(this.game.data.enemyBoard),this.spawnEnemyBoard(this.game.data.enemyBoard),this.ammo=this.game.add.group(),this.enemyAmmo=this.game.add.group(),this.drawAmmoSprites(),this.enemyAmmo.setAll("visible",!1),setTimeout(function(){Battleship.game.data.playerBoard=Battleship.GameState.positionData("enemy"),Battleship.GameState.spawnPlayerBoard(Battleship.game.data.playerBoard),Battleship.GameState.playerCells.visible=!1,Battleship.GameState.bulletPool=Battleship.game.add.group();for(var t=0;t<Battleship.GameState.NUMBER_OF_BULLETS;t++){var e=Battleship.game.add.sprite(0,0,"bullet");Battleship.GameState.bulletPool.add(e),e.anchor.setTo(.5,.5),Battleship.game.physics.enable(e,Phaser.Physics.ARCADE),e.kill()}Battleship.GameState.gun=Battleship.GameState.add.sprite(Battleship.game.width/2,Battleship.game.height-12,"cannon"),Battleship.GameState.gun.anchor.setTo(.25,.5),Battleship.GameState.gun.animations.add("kaboom",[1,1,1,2,2,3,0],18,!1),Battleship.GameState.cannonBase=Battleship.GameState.add.sprite(Battleship.game.width/2,Battleship.game.height-5,"cannonBase"),Battleship.GameState.cannonBase.anchor.setTo(.5),Battleship.GameState.cannonBase.angle=180,Battleship.GameState.cannonBase.width=128,Battleship.game.input.activePointer.x=Battleship.game.width/2,Battleship.game.input.activePointer.y=Battleship.game.height/2,Battleship.GameState.explosionGroup=Battleship.game.add.group(),Battleship.GameState.hitGroup=Battleship.game.add.group(),Battleship.GameState.hitEnemyGroup=Battleship.game.add.group(),Battleship.GameState.enemySmokeGroup=Battleship.game.add.group(),Battleship.GameState.playerSmokeGroup=Battleship.game.add.group(),Battleship.GameState.music=Battleship.GameState.add.audio("music"),Battleship.GameState.music.loopFull(.4),Battleship.game.isReady=!0},10),this.scoreKeep(this.scoreText),this.bannerMessage(),this.bar.visible=!0,this.msg.visible=!0,this.flash=this.game.add.graphics(0,0),this.flash.beginFill(16777215,1),this.flash.drawRect(0,0,this.game.width,this.game.height),this.flash.endFill(),this.flash.alpha=0,this.game.world.setBounds(-10,-10,this.game.width+20,this.game.height+20)},Battleship.GameState.shakeCamera=function(){this.flash.alpha=1,this.add.tween(this.flash).to({alpha:0},100,Phaser.Easing.Cubic.In).start(),this.camera.y=0,this.add.tween(this.camera).to({y:-10},40,Phaser.Easing.Sinusoidal.InOut,!1,0,5,!0).start()},Battleship.GameState.bannerMessage=function(){this.bar=this.add.graphics(),this.bar.beginFill(0,.2),this.bar.drawRect(0,this.game.world.centerY-50,800,100);var t={font:"bold 32px Arial",fill:"#FFF"};"player"===this.game.data.turn?(this.msg=this.add.text(this.game.world.centerX,this.game.world.centerY,"Player's Turn!",t),this.msg.anchor.setTo(.5),this.msg.setShadow(3,3,"rgba(0, 0, 0, 0.5",2)):"enemy"===this.game.data.turn&&(this.msg=this.add.text(this.game.world.centerX,this.game.world.centerY,"Enemy's Turn!",t),this.msg.anchor.setTo(.5),this.msg.setShadow(3,3,"rgba(0, 0, 0, 0.5",2)),this.bar.visible=!1,this.msg.visible=!1},Battleship.GameState.scoreKeep=function(){var t={font:"bold 32px Arial",fill:"#FFF"};this.score=this.add.text(this.game.world.centerX-10,this.game.world.centerY-385,this.scoreText+this.game.data.playerScore,t),this.score.anchor.setTo(.5),this.score.setShadow(3,3,"rgba(0, 0, 0, 0.5",2)},Battleship.GameState.drawAmmoText=function(){var t={font:"bold 32px Arial",fill:"#FFF"};this.ammoText=this.game.add.text(this.game.world.centerX-300,this.game.world.centerY+315,"Ammo: ",t),this.ammoText.setShadow(3,3,"rgba(0, 0, 0, 0.5",2)},Battleship.GameState.drawAmmoSprites=function(){for(var t=0;t<6;t++){var e=this.ammo.create(this.game.world.centerX-315+45*t,this.game.height-37,"bullet");e.anchor.setTo(.5),e.angle=270,e.alpha=.85}for(var a=0;a<6;a++){var s=this.enemyAmmo.create(this.game.world.centerX-315+45*a,this.game.height-37,"bullet");s.anchor.setTo(.5),s.angle=270,s.alpha=.85}},Battleship.GameState.shipPlacement=function(t,e,a,s,i){switch(a){case 2:!0!==t.ship2.placed&&(90===this.levels.ships[i].ship2.angle?t.ship2.location=this.game.add.sprite(e.x+32,e.y-32,"ship2"):0===this.levels.ships[i].ship2.angle&&(t.ship2.location=this.game.add.sprite(e.x-32,e.y-32,"ship2")),t.ship2.location.angle=this.levels.ships[i].ship2.angle,t.ship2.location.visible=s,t.ship2.placed=!0);break;case 3:!0!==t.ship3.placed&&(90===this.levels.ships[i].ship3.angle?t.ship3.location=this.game.add.sprite(e.x+32,e.y-32,"ship3"):0===this.levels.ships[i].ship3.angle&&(t.ship3.location=this.game.add.sprite(e.x-32,e.y-32,"ship3")),t.ship3.location.angle=this.levels.ships[i].ship3.angle,t.ship3.location.visible=s,t.ship3.placed=!0);break;case 4:!0!==t.ship4.placed&&(90===this.levels.ships[i].ship4.angle?t.ship4.location=this.game.add.sprite(e.x+32,e.y-32,"ship4"):0===this.levels.ships[i].ship4.angle&&(t.ship4.location=this.game.add.sprite(e.x-32,e.y-32,"ship4")),t.ship4.location.angle=this.levels.ships[i].ship4.angle,t.ship4.location.visible=s,t.ship4.placed=!0);break;case 5:!0!==t.ship5.placed&&(90===this.levels.ships[i].ship5.angle?t.ship5.location=this.game.add.sprite(e.x+32,e.y-32,"ship5"):0===this.levels.ships[i].ship5.angle&&(t.ship5.location=this.game.add.sprite(e.x-32,e.y-32,"ship5")),t.ship5.location.angle=this.levels.ships[i].ship5.angle,t.ship5.location.visible=s,t.ship5.placed=!0);break;case 6:!0!==t.ship6.placed&&(90===this.levels.ships[i].ship6.angle?t.ship6.location=this.game.add.sprite(e.x+32,e.y-32,"ship6"):0===this.levels.ships[i].ship6.angle&&(t.ship6.location=this.game.add.sprite(e.x-32,e.y-32,"ship6")),t.ship6.location.angle=this.levels.ships[i].ship6.angle,t.ship6.location.visible=s,t.ship6.placed=!0)}},Battleship.GameState.switchTurn=function(t){"player"===t?(this.reservedBullets=6,this.game.data.turn="player",this.bannerMessage(),this.viewMessage()):"enemy"===t&&(this.reservedBullets=6,this.game.data.turn="enemy",this.bannerMessage(),this.viewMessage())},Battleship.GameState.viewMessage=function(){"player"==this.game.data.turn?(this.bar.visible=!0,this.msg.visible=!0,changeBoardsToEnemys(!1),setTimeout(function(){Battleship.GameState.bar.visible=!1,Battleship.GameState.msg.visible=!1},2e3)):"enemy"==this.game.data.turn&&(this.bar.visible=!0,this.msg.visible=!0,changeBoardsToEnemys(!0),setTimeout(function(){Battleship.GameState.bar.visible=!1,Battleship.GameState.msg.visible=!1,Battleship.game.data.isShooting=!1},2e3))},Battleship.GameState.GameOverPlayer=function(){var t={},e=0;t=this.cells.children;for(var a=0;a<t.length;a++)e+=t[a].marker;e<=0&&"player"==this.game.data.turn?(this.gameOver=!0,this.game.data.loser="enemy"):this.gameOver=!1},Battleship.GameOverState=Battleship.GameOverState||{},Battleship.GameOverState.intro_text,Battleship.GameOverState.init=function(){},Battleship.GameOverState.preload=function(){},Battleship.GameOverState.create=function(){this.game.stage.backgroundColor="#222";var t=this.game.add.graphics();t.beginFill(0,.2),t.drawRect(0,this.game.world.centerY-50,800,100);var e={font:"bold 32px Arial",fill:"#fff",boundsAlignH:"center",boundsAlignV:"middle"};"player"==this.game.data.loser?(this.intro_text=this.game.add.text(0,0,"You Lost! Tap to Restart",e),this.intro_text.setShadow(3,3,"rgba(0, 0, 0, 0.5)",2),this.intro_text.setTextBounds(-75,this.game.world.centerY-50,800,100)):"enemy"==this.game.data.loser&&(this.intro_text=this.game.add.text(0,0,"You Win! Tap to Restart",e),this.intro_text.setShadow(3,3,"rgba(0, 0, 0, 0.5)",2),this.intro_text.setTextBounds(-75,this.game.world.centerY-50,800,100)),t.inputEnabled=!0,t.events.onInputDown.add(this.gameStart,this)},Battleship.GameOverState.gameStart=function(){this.game.state.start("GameState")},Battleship.GameOverState.shutdown=function(){console.log("shutdown game over")},Battleship.GameState.spawnPlayerBoard=function(t){this.BOARD_COLS=10,this.BOARD_ROWS=10,this.playerCells=this.game.add.group(),this.playerCells.ship2=0,this.playerCells.ship3=0,this.playerCells.ship4=0,this.playerCells.ship5=0,this.playerCells.ship6=0,this.playerShips.ship2.placed=!1,this.playerShips.ship3.placed=!1,this.playerShips.ship4.placed=!1,this.playerShips.ship5.placed=!1,this.playerShips.ship6.placed=!1;for(var e=0;e<this.BOARD_COLS;e++)for(var a=0;a<this.BOARD_ROWS;a++){var s=this.playerCells.create(e*this.CELL_SIZE_SPACED+this.CELL_SIZE_SPACED/2+2,a*this.CELL_SIZE_SPACED+this.CELL_SIZE/2+64,"cell",0);s.anchor.setTo(.5,.5),s.name="cell: "+e.toString()+"x"+a.toString(),s.enemyContact=0,s.marker=t.matrix[a][e],this.shipPlacement(this.playerShips,s,s.marker,!1,t.index),s.posX=s.x,s.posY=s.y,s.hasEnemy=s.marker>0,s.isHit=!1}},Battleship.GameState.enemyHit=function(t){t.hasEnemy=!1,this.shipHit=this.add.audio("explosion"),this.shipHit.play()},Battleship.GameState.sunkEnemyBattleship=function(t){switch(t.enemyContact){case 2:this.cells.ship2+=t.enemyContact,4===this.cells.ship2&&(this.sunkShip=this.add.audio("sunkenShip"),this.sunkShip.play(),this.shakeCamera(),this.enemyShips.ship2.location.visible=!0,this.enemyShips.ship2.sunken=!0,this.game.data.playerScore+=4);break;case 3:this.cells.ship3+=t.enemyContact,9===this.cells.ship3&&(this.sunkShip=this.add.audio("sunkenShip"),this.sunkShip.play(),this.shakeCamera(),this.enemyShips.ship3.location.visible=!0,this.enemyShips.ship3.sunken=!0,this.game.data.playerScore+=9);break;case 4:this.cells.ship4+=t.enemyContact,16===this.cells.ship4&&(this.sunkShip=this.add.audio("sunkenShip"),this.sunkShip.play(),this.shakeCamera(),this.enemyShips.ship4.location.visible=!0,this.enemyShips.ship4.sunken=!0,this.game.data.playerScore+=16);break;case 5:this.cells.ship5+=t.enemyContact,25===this.cells.ship5&&(this.sunkShip=this.add.audio("sunkenShip"),this.sunkShip.play(),this.shakeCamera(),this.enemyShips.ship5.location.visible=!0,this.enemyShips.ship5.sunken=!0,this.game.data.playerScore+=25);break;case 6:this.cells.ship6+=t.enemyContact,36===this.cells.ship6&&(this.sunkShip=this.add.audio("sunkenShip"),this.sunkShip.play(),this.shakeCamera(),this.enemyShips.ship6.location.visible=!0,this.enemyShips.ship6.sunken=!0,this.game.data.playerScore+=36)}!0===this.enemyShips.ship2.location.visible&&!0===this.enemyShips.ship3.location.visible&&!0===this.enemyShips.ship4.location.visible&&!0===this.enemyShips.ship5.location.visible&&!0===this.enemyShips.ship6.location.visible&&(this.game.data.loser="enemy",this.enemyShips.ship2.location.visible=!1,this.enemyShips.ship3.location.visible=!1,this.enemyShips.ship4.location.visible=!1,this.enemyShips.ship5.location.visible=!1,this.enemyShips.ship6.location.visible=!1)},Battleship.GameState.miss=function(t){t.frame=2,this.missEnemy=this.add.audio("miss"),this.missEnemy.play()},Battleship.GameState.simulateShooting=function(t){if(this.game.data.isShooting=!0,this.reservedBullets>0&&!this.game.data.loser){var e=this.playerCells.getChildAt(this.game.rnd.integerInRange(0,99));e.isHit?this.simulateShooting(this.playerCells):(this.gun.rotation=Math.atan2(e.y-this.gun.y,e.x-this.gun.x),this.selectCell(e))}else setTimeout(function(){Battleship.GameState.switchTurn("player")},100)},Battleship.GameState.updateEnemyAmmo=function(){this.enemyAmmo.getChildAt(this.reservedBullets-1).visible=!1},Battleship.GameState.checkEnemyCollision=function(){this.game.physics.arcade.collide(this.bulletPool,this.playerCells,function(t,e){t.kill(),e.isHit=!0,e.hasEnemy?(this.getExplosion(e,e.posX,e.posY),this.getHitLocation("enemy",e,e.x,e.y),this.shipSmoke("enemy",e,e.x,e.y),this.enemyHit(e),this.sunkPlayerBattleship(e),this.game.data.playerScore+=e.enemyContact,setTimeout(function(){callShootAgain(this.playerCells)},900)):(this.miss(e),setTimeout(function(){callShootAgain(this.playerCells)},1200)),this.gameOver&&(this.cells.forEach(function(t){t.frame=0},this),this.music.stop(),this.game.data.loser="player",this.game.state.start("GameOverState")),e.body.enable&&(e.body.enable=!1)},null,this)},Battleship.GameState.GameOverEnemy=function(){var t={},e=0;t=this.playerCells.children;for(var a=0;a<t.length;a++)e+=t[a].marker;e<=0&&"enemy"==this.game.data.turn?this.gameOver=!0:this.gameOver=!1},Battleship.GameState.spawnEnemyBoard=function(t){this.BOARD_COLS=10,this.BOARD_ROWS=10,this.cells=this.game.add.group(),this.cells.ship2=0,this.cells.ship3=0,this.cells.ship4=0,this.cells.ship5=0,this.cells.ship6=0,this.enemyShips.ship2.placed=!1,this.enemyShips.ship3.placed=!1,this.enemyShips.ship4.placed=!1,this.enemyShips.ship5.placed=!1,this.enemyShips.ship6.placed=!1;for(var e=0;e<this.BOARD_COLS;e++)for(var a=0;a<this.BOARD_ROWS;a++){var s=this.cells.create(e*this.CELL_SIZE_SPACED+this.CELL_SIZE_SPACED/2+2,a*this.CELL_SIZE_SPACED+this.CELL_SIZE/2+64,"cell",0);s.anchor.setTo(.5,.5),s.name="cell: "+e.toString()+"x"+a.toString(),s.inputEnabled=!0,s.enemyContact=0,s.marker=t.matrix[a][e],this.shipPlacement(this.enemyShips,s,s.marker,!1,t.index),s.posX=s.x,s.posY=s.y,s.hasEnemy=s.marker>0,s.events.onInputDown.add(this.selectCell,this)}},Battleship.GameState.sunkPlayerBattleship=function(t){switch(t.enemyContact){case 2:return this.playerCells.ship2+=t.enemyContact,4===this.playerCells.ship2&&(this.sunkShip=this.add.audio("sunkenShip"),this.sunkShip.play(),this.shakeCamera(),this.playerShips.ship2.sunken=!0,!0);case 3:return this.playerCells.ship3+=t.enemyContact,9===this.playerCells.ship3&&(this.sunkShip=this.add.audio("sunkenShip"),this.sunkShip.play(),this.shakeCamera(),this.playerShips.ship2.sunken=!0,!0);case 4:return this.playerCells.ship4+=t.enemyContact,16===this.playerCells.ship4&&(this.sunkShip=this.add.audio("sunkenShip"),this.sunkShip.play(),this.shakeCamera(),this.playerShips.ship2.sunken=!0,!0);case 5:return this.playerCells.ship5+=t.enemyContact,25===this.playerCells.ship5&&(this.sunkShip=this.add.audio("sunkenShip"),this.sunkShip.play(),this.shakeCamera(),this.playerShips.ship2.sunken=!0,!0);case 6:return this.playerCells.ship6+=t.enemyContact,36===this.playerCells.ship6&&(this.sunkShip=this.add.audio("sunkenShip"),this.sunkShip.play(),this.shakeCamera(),this.playerShips.ship2.sunken=!0,!0);default:return!1}!0===this.playerShips.ship2.sunken&&!0===this.playerShips.ship3.sunken&&!0===this.playerShips.ship4.sunken&&!0===this.playerShips.ship5.sunken&&!0===this.playerShips.ship6.sunken&&(this.game.data.loser="player")},Battleship.GameState.shootBullet=function(){if(void 0===this.lastBulletShotAt&&(this.lastBulletShotAt=0),!(this.game.time.now-this.lastBulletShotAt<this.SHOT_DELAY)){this.lastBulletShotAt=this.game.time.now;var t=this.bulletPool.getFirstDead();null!==t&&void 0!==t&&(t.revive(),t.checkWorldBounds=!0,t.outOfBoundsKill=!0,t.reset(this.gun.x,this.gun.y),t.rotation=this.gun.rotation,t.body.velocity.x=Math.cos(t.rotation)*this.BULLET_SPEED,t.body.velocity.y=Math.sin(t.rotation)*this.BULLET_SPEED,this.cannonShot=this.add.audio("shoot"),this.cannonShot.play(),"player"===this.game.data.turn?this.updateAmmo():"enemy"===this.game.data.turn&&this.updateEnemyAmmo(),this.reservedBullets-=1)}},Battleship.GameState.shootCannon=function(){this.gun.play("kaboom")},Battleship.GameState.updateAmmo=function(){this.ammo.getChildAt(this.reservedBullets-1).visible=!1},Battleship.GameState.update=function(){this.game.isReady&&("player"==this.game.data.turn?this.gun.rotation=this.game.physics.arcade.angleToPointer(this.gun):"enemy"==this.game.data.turn&&(this.game.data.isShooting||this.simulateShooting(this.playerCells)),"player"==this.game.data.turn?(this.GameOverPlayer(),this.checkPlayerCollision()):"enemy"==this.game.data.turn&&(this.GameOverEnemy(),this.checkEnemyCollision()))},Battleship.GameState.getExplosion=function(t,e,a){var s=this.explosionGroup.getFirstDead();if(null===s){s=this.game.add.sprite(0,0,"explosion"),s.anchor.setTo(.5,.5);s.animations.add("boom",[0,0,1,2,3],60,!1).killOnComplete=!0,this.explosionGroup.add(s)}return s.revive(),s.x=e,s.y=a,s.angle=this.game.rnd.integerInRange(0,360),s.animations.play("boom"),s},Battleship.GameState.getHitLocation=function(t,e,a,s){var i="player"===t?this.hitGroup.getFirstDead():this.hitEnemyGroup.getFirstDead();return null===i&&(i=this.game.add.sprite(0,0,"fire",0),i.anchor.setTo(.5,.5),i.animations.add("flames",[0,1,2,3,4],14,!0),"player"===t?this.hitGroup.add(i):this.hitEnemyGroup.add(i)),i.revive(),i.x=a+3,i.y=s-10,i.width=33,i.height=60,i.angle=15,i.animations.play("flames"),i},Battleship.GameState.shipSmoke=function(t,e,a,s){var i="player"===t?this.enemySmokeGroup.getFirstDead():this.playerSmokeGroup.getFirstDead();return null===i&&(i=this.game.add.sprite(0,0,"smoke",0),i.anchor.setTo(.5),i.animations.add("smoking",[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],30,!0),"player"===t?this.enemySmokeGroup.add(i):this.playerSmokeGroup.add(i)),i.revive(),i.x=a+5,i.y=s-26,i.angle=this.game.rnd.integerInRange(15,30),i.alpha=.85,i.width=44,i.height=80,i.animations.play("smoking"),i},Battleship.GameState.selectCell=function(t){0===t.frame&&"enemy"==this.game.data.turn?(this.shootBullet(),this.shootCannon(),this.game.physics.enable(t,Phaser.Physics.ARCADE),t.body.immovable=!0,t.body.allowGravity=!1,t.hasEnemy&&(t.enemyContact=t.marker,t.marker=0)):t.input.pointerOver&&0===t.frame&&"player"==this.game.data.turn&&this.reservedBullets>0&&(this.shootBullet(),this.shootCannon(),this.game.physics.enable(t,Phaser.Physics.ARCADE),t.body.immovable=!0,t.body.allowGravity=!1,t.hasEnemy&&(t.enemyContact=t.marker,t.marker=0))},Battleship.GameState.checkPlayerCollision=function(){this.game.physics.arcade.collide(this.bulletPool,this.cells,function(t,e){t.kill(),e.body.enable&&(e.body.enable=!1),e.hasEnemy?(this.getExplosion(e,e.posX,e.posY),this.getHitLocation("player",e,e.x,e.y),this.shipSmoke("player",e,e.x,e.y),this.enemyHit(e),this.sunkEnemyBattleship(e),this.game.data.playerScore+=e.enemyContact,this.score.text=this.scoreText+this.game.data.playerScore):this.miss(e),0===this.reservedBullets&&setTimeout(function(){Battleship.GameState.switchTurn("enemy")},500),this.gameOver&&(this.cells.forEach(function(t){t.frame=0},this),this.music.stop(),this.game.data.playerScore+=Math.floor(32*Math.random())+4,this.game.state.start("GameOverState"))},null,this)},Battleship.game=new Phaser.Game(664,846,Phaser.AUTO,"game-canvas"),Battleship.game.data={},Battleship.game.data.loser="",Battleship.game.data.turn="player",Battleship.game.data.playerBoardIndex=null,Battleship.game.data.enemyBoardIndex=null,Battleship.game.data.playerScore=0,Battleship.game.data.playerBoard=null,Battleship.game.data.enemyBoard=null,Battleship.game.data.currentEnemyBoard={},Battleship.game.data.currentPlayerBoard={},Battleship.game.data.isShooting=!1,Battleship.game.state.add("HomeState",Battleship.HomeState),Battleship.game.state.add("TurnState",Battleship.TurnState),Battleship.game.state.add("GameState",Battleship.GameState),Battleship.game.state.add("GameOverState",Battleship.GameOverState),Battleship.game.state.start("HomeState");