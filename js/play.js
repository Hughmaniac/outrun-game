 var playState = {

     preload: function () {

         var player, floor, win, jumpButton, platform;
         var total = 0;
         var jumpKey;
         var leftKey;
         var rightKey;
         var jumpTimer = 0;

     },

     create: function () {

                 

         jumpKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
         rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
         leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
         
         platformGroup = this.game.add.group();
         for (var i = 0; i < 3; i++){
             platformGroup.create(360 + Math.random() * 200, 120 + Math.random() * 200, 'win');
         }
         
         
         platformGroup.setAll('body.immovable', true);
         
         player = this.game.add.sprite(16, 400, 'player');
         win = this.game.add.sprite(256, 256, 'win');
         floor = this.game.add.sprite(0, 430, 'floor');
         
         this.game.physics.arcade.enable([player, floor, win, platformGroup]);

         player.body.collideWorldBounds = true;
         player.body.gravity.y = 1400;
         player.body.maxVelocity.y = 500;
         player.body.setSize(6, 6, 10, 10);


         floor.body.allowGravity = false;
         floor.body.immovable = true;
         win.body.allowGravity = false;
         win.body.immovable = true;
     },

     update: function () {



         // when player and win sprite overlap, the win function is called.
         this.game.physics.arcade.overlap(player, win, this.gameOver, null, this);

         this.game.physics.arcade.collide(floor, player);
         this.game.physics.arcade.collide(platformGroup, player);

         // Setting up velocity to keypresses
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

     gameOver: function () {
         this.game.state.start('gameOver');
     }
 }
