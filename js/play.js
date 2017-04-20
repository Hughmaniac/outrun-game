 var player, floor, win, jumpButton, platform, platforms;
 var total = 0;
 var jumpKey;
 var leftKey;
 var rightKey;
 var jumpTimer = 0;
 var gameSpeedPlatform = 150;
 var platformWidth;
 var masterTimer;
 var platformSpawnRate = 1800;

 var playState = {

     preload: function () {



     },

     create: function () {

         this.game.camera.flash(0x000000, 1000);

         var nameLabel = this.game.add.text(80, 80, 'gameplay', {
             font: '50px Hellovetica',
             fill: '#ffffff'
         });


         //Enable the Arcade physics system
         this.game.physics.startSystem(Phaser.Physics.ARCADE);

         // KEYBINDINGS
         cursors = this.game.input.keyboard.createCursorKeys();

         //Get the dimensions of the tile we are using
         this.tileWidth = this.game.cache.getImage('platform').width;
         this.tileHeight = this.game.cache.getImage('platform').height;

         // WORLD BOUNDS SETTINGS






         // PLATFORM GENERATION
         this.platforms = this.game.add.group();
         this.platforms.enableBody = true;
         this.platforms.createMultiple(250, 'platform');
         this.timer = this.game.time.events.loop(2000, this.addPlatform, this);
         this.platforms.setAll('body.checkCollision.up', true);
         this.platforms.setAll('body.checkCollision.down', false);
         this.platforms.setAll('body.checkCollision.left', false);
         this.platforms.setAll('body.checkCollision.right', false);

         // SPRITE INITIALIZATION
         player = this.game.add.sprite(16, 0, 'player');
         win = this.game.add.sprite(256, gameHeight - 256, 'win');
         initPlatform = this.game.add.sprite(0, 20, 'platform');

         leftWall = this.game.add.sprite(-9, 0);
         rightWall = this.game.add.sprite(gameWidth - 1, 0);
         bottomWall = this.game.add.sprite(0, gameHeight);


         // SPRITE PHYSICS SETTINGS
         this.game.physics.arcade.enable([player, win, initPlatform, leftWall, rightWall, bottomWall]);
         player.body.gravity.y = 1400;
         player.body.maxVelocity.y = 500;
         win.body.allowGravity = false;
         win.body.immovable = true;
         initPlatform.body.velocity.y = 100;
         initPlatform.body.immovable = true;

         // WORLD INVISIBLE WALLS

         leftWall.scale.x = 10;
         leftWall.scale.y = gameHeight;
         leftWall.body.immovable = true;

         rightWall.scale.x = 10;
         rightWall.scale.y = gameHeight;
         rightWall.body.immovable = true;

         bottomWall.scale.x = gameWidth;
         bottomWall.scale.y = 10;
         bottomWall.body.immovable = true;



         // GAME TIMER FOR SPEED SHIFTS
         this.game.time.events.add(Phaser.Timer.SECOND * 15, this.speed1, this);
         this.game.time.events.add(Phaser.Timer.SECOND * 30, this.speed2, this);
         this.game.time.events.add(Phaser.Timer.SECOND * 45, this.speed3, this);
         this.game.time.events.add(Phaser.Timer.SECOND * 60, this.speed4, this);

     },

     update: function () {
         console.log(gameSpeedPlatform);
         console.log(platformSpawnRate);

         this.game.physics.arcade.collide(player, this.platforms);
         this.game.physics.arcade.collide(player, initPlatform);
         this.game.physics.arcade.collide(player, leftWall);
         this.game.physics.arcade.collide(player, rightWall);


         // when player and win sprite overlap, the win function is called.
         this.game.physics.arcade.overlap(player, bottomWall, this.gameOver, null, this);


         // X AXIS MOVEMENT
         if (cursors.left.isDown) {
             player.body.velocity.x = -400;
         } else if (cursors.right.isDown) {
             player.body.velocity.x = 400;
         } else {
             player.body.velocity.x = 0;
         }

         // JUMP COMMAND
         if (cursors.up.isDown) {
             if (player.body.touching.down && jumpTimer === 0) {
                 // jump is allowed to start
                 jumpTimer = 1;
                 player.body.velocity.y = -400;
             } else if (jumpTimer > 0 && jumpTimer < 31) {
                 // keep jumping higher
                 jumpTimer++;
                 player.body.velocity.y = -400 + (jumpTimer * 3);
             }
         } else {
             // jump button not being pressed, reset jump timer
             jumpTimer = 0;
         }

         console.log(jumpTimer);
     },

     addTile: function (x, y) {


         //Get a tile that is not currently on screen
         var tile = this.platforms.getFirstDead();

         //Reset it to the specified coordinates
         tile.reset(x, y);
         tile.body.velocity.y = gameSpeedPlatform;
         tile.body.immovable = true;

         //When the tile leaves the screen, kill it
         tile.checkWorldBounds = true;
         tile.outOfBoundsKill = true;
     },

     addPlatform: function (y) {


         //If no y position is supplied, render it just outside of the screen
         if (typeof (y) == "undefined") {
             y = -this.tileHeight;
         }

         platformWidth = this.tileWidth;

         this.addTile(this.getRandomInt(), y);
     },

     render: function () {

         //         // CAMERA DEBUG STATS
         //         this.game.debug.cameraInfo(this.game.camera, 32, 32);
         //         this.game.debug.spriteCoords(player, 32, 500);
         //
         //         // BOUNDING BOX DEBUG
         //         this.game.debug.body(player);
         //         this.game.debug.body(this.platforms);
     },

     getRandomInt: function () {
         return Math.floor(Math.random() * (gameWidth - platformWidth));
     },

     speed1: function () {
         gameSpeedPlatform = 200;
         this.timer.delay = 1500;

     },

     speed2: function () {
         gameSpeedPlatform = 250;
         this.timer.delay = 1000;

     },

     speed3: function () {
         gameSpeedPlatform = 300;
         this.timer.delay = 500;

     },

     speed4: function () {
         gameSpeedPlatform = 400;
         this.timer.delay = 200;

     },

     gameOver: function () {
         this.game.state.start('gameOver');
     }
 };
