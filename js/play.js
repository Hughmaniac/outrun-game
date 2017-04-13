 var player, floor, win, jumpButton, platform, platforms;
 var total = 0;
 var jumpKey;
 var leftKey;
 var rightKey;
 var jumpTimer = 0;
 var gameSpeedPlatform = 150;
 var platformWidth;
 var masterTimer;
 var platformSpawnRate = 2000;

 var playState = {

     preload: function () {



     },

     create: function () {

         this.game.camera.flash(0x000000, 1000);

         var nameLabel = this.game.add.text(80, 80, 'gameplay', {
             font: '50px Arial',
             fill: '#ffffff'
         });


         //Enable the Arcade physics system
         this.game.physics.startSystem(Phaser.Physics.ARCADE);

         // KEYBINDINGS
         jumpKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
         rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
         leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);

         //Get the dimensions of the tile we are using
         this.tileWidth = this.game.cache.getImage('platform').width;
         this.tileHeight = this.game.cache.getImage('platform').height;

         // PLATFORM GENERATION
         this.platforms = this.game.add.group();
         this.platforms.enableBody = true;
         this.platforms.createMultiple(250, 'platform');
         this.timer = this.game.time.events.loop(platformSpawnRate, this.addPlatform, this);
         this.platforms.setAll('body.checkCollision.up', true);
         this.platforms.setAll('body.checkCollision.down', false);
         this.platforms.setAll('body.checkCollision.left', false);
         this.platforms.setAll('body.checkCollision.right', false);

         // SPRITE INITIALIZATION
         player = this.game.add.sprite(16, 0, 'player');
         win = this.game.add.sprite(256, gameHeight - 256, 'win');
         initPlatform = this.game.add.sprite(0,20, 'platform');


         // SPRITE PHYSICS SETTINGS
         this.game.physics.arcade.enable([player, win, initPlatform]);
         player.body.collideWorldBounds = true;
         player.body.gravity.y = 1400;
         player.body.maxVelocity.y = 500;
         win.body.allowGravity = false;
         win.body.immovable = true;
         initPlatform.body.velocity.y = 100;
         initPlatform.body.immovable = true;

         // GAME TIMER FOR SPEED SHIFTS
         this.game.time.events.add(Phaser.Timer.SECOND * 2, this.speed1, this);
         this.game.time.events.add(Phaser.Timer.SECOND * 3, this.speed2, this);
         this.game.time.events.add(Phaser.Timer.SECOND * 4, this.speed3, this);
         this.game.time.events.add(Phaser.Timer.SECOND * 5, this.speed4, this);

     },

     update: function () {
         console.log(gameSpeedPlatform);
         console.log(platformSpawnRate);
         
         this.game.physics.arcade.collide(player, this.platforms);
         this.game.physics.arcade.collide(player, initPlatform);


         // when player and win sprite overlap, the win function is called.
         this.game.physics.arcade.overlap(player, win, this.gameOver, null, this);


         // X AXIS MOVEMENT
         if (leftKey.isDown) {
             player.body.velocity.x = -400;
         } else if (rightKey.isDown) {
             player.body.velocity.x = 400;
         } else {
             player.body.velocity.x = 0;
         }

         // JUMP COMMAND
         if (jumpKey.isDown) {
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
         platformSpawnRate = 1500;
     },

     speed2: function () {
         gameSpeedPlatform = 250;
         platformSpawnRate = 1000;

     },

     speed3: function () {
         gameSpeedPlatform = 300;
         platformSpawnRate = 500;

     },

     speed4: function () {
         gameSpeedPlatform = 400;
         platformSpawnRate = 200;

     },



     gameOver: function () {
         this.game.state.start('gameOver');
     }
 };
