var cursors, space;
var run, idle1;
gameIntroState = {

    create: function () {
        //VERSION


        var nameLabel = this.game.add.text(80, 80, 'Intro', {
            font: '50px Hellovetica',
            fill: '#ffffff'
        });

        //KEYBINDINGS

        cursors = this.game.input.keyboard.createCursorKeys();
        space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


        // SPRITE INITIALIZATION
        BG = this.game.add.sprite(0, 0, 'stagingBG');
        scaffold = this.game.add.sprite(20, 214, 'scaffoldPlatform');
        fire = this.game.add.sprite(174, 120, 'firePlatform');
        player = this.game.add.sprite(16, 200, 'playerSprite');
        car = this.game.add.sprite(20, 348, 'car');
        bottomWall = this.game.add.sprite(0, gameHeight - 50);
        //VERSION
        b = this.game.add.bitmapText(5, 5, "PixelOperator", "ALPHA Version 1.0", 16);

        c = this.game.add.bitmapText(this.game.world.centerX, 150, "PixelOperator", "^ Jump up to the fire escape ^", 16);
        c.anchor.setTo(.5, 0);

        // SPRITE SETTINGS
        player.scale.setTo(2, 2);
        player.anchor.setTo(.5, .5);

        BG.scale.setTo(2);
        car.scale.setTo(2);
        scaffold.scale.setTo(2);
        fire.scale.setTo(2);

        // SPRITE ANIMATIONS

        player.animations.add('playerIdle', [0, 1, 2, 3], 2, true);
        player.animations.add('playerRunRight', [8, 9, 10, 11, 12, 13, 14, 15], 15, true);
        player.animations.add('playerRunLeft', [23, 22, 21, 20, 19, 18, 17, 16], 15, true);
        player.animations.add('playerJumpRight', [24, 25, 26, 27, 28, 29], 15, false);
        player.animations.add('playerJumpLeft', [37, 36, 35, 34, 33, 32], 15, false);
        player.animations.add('playerJumpLoopRight', [28, 29], 15, true);
        player.animations.add('playerJumpLoopLeft', [32, 33], 15, true);
        player.animations.play('playerIdle');


        // SPRITE PHYSICS/BODY SETTINGS
        this.game.physics.arcade.enable([player, bottomWall, fire, scaffold]);

        player.body.collideWorldBounds = true;
        player.body.gravity.y = 3000;
        player.body.maxVelocity.y = 3000;
        player.body.setSize(30, 50, 10, 0);

        bottomWall.scale.x = gameWidth;
        bottomWall.scale.y = 50;
        bottomWall.body.immovable = true;
        scaffold.body.immovable = true;
        fire.body.immovable = true;

        scaffold.body.checkCollision.down = false;
        scaffold.body.checkCollision.left = false;
        scaffold.body.checkCollision.right = false;
        fire.body.checkCollision.down = false;
        fire.body.checkCollision.left = false;
        fire.body.checkCollision.right = false;


        //CAMERA INITIAL POSITION
        this.game.camera.y = gameHeight - 480;

    },

    update: function () {
        // when player and fire sprite overlap, the win function is called.
        this.game.physics.arcade.collide(player, fire, this.fade, null, this);

        this.game.physics.arcade.collide(bottomWall, player);
        this.game.physics.arcade.collide(scaffold, player);
        this.game.physics.arcade.collide(fire, player);

        // X AXIS MOVEMENT
        if (cursors.left.isDown) {
            player.body.velocity.x = -300;
        } else if (cursors.right.isDown) {
            player.body.velocity.x = 300;
        } else {
            player.body.velocity.x = 0;
        }

        if (cursors.left.isDown && player.body.touching.down) {
            player.animations.play('playerRunLeft');
        } else if (cursors.right.isDown && player.body.touching.down) {
            player.animations.play('playerRunRight');
        }



        // JUMP COMMAND
        if (cursors.up.isDown || space.isDown) {
            downFlag = true;
            if (player.body.touching.down && jumpTimer === 0) {
                // jump is allowed to start
                jumpTimer = 1;
                player.body.velocity.y = -600;
            } else if (jumpTimer > 0 && jumpTimer < 18) {
                // keep jumping higher
                jumpTimer++;
                player.body.velocity.y = -600 + (jumpTimer * 3);
            }
        } else {
            // jump button not being pressed, reset jump timer
            jumpTimer = 0;
        }
        if (!player.body.touching.down) {
            if (cursors.up.isDown && cursors.right.isDown || space.isDown && cursors.right.isDown) {
                player.animations.play('playerJumpRight');
                player.animations.paused = true;
                player.animations.paused = false;
                player.animations.currentAnim.onComplete.add(this.startRightLoop, this);
            } else if (cursors.up.isDown || space.isDown) {
                player.animations.play('playerJumpRight');
                player.animations.paused = true;
                player.animations.paused = false;
                player.animations.currentAnim.onComplete.add(this.startRightLoop, this);

            }

            if (cursors.up.isDown && cursors.left.isDown || space.isDown && cursors.left.isDown) {
                player.animations.play('playerJumpLeft');
                player.animations.paused = true;
                player.animations.paused = false;
                player.animations.currentAnim.onComplete.add(this.startRightLoop, this);
            } else if (cursors.up.isDown || space.isDown) {
                player.animations.play('playerJumpRight');
                player.animations.paused = true;
                player.animations.paused = false;
                player.animations.currentAnim.onComplete.add(this.startRightLoop, this);

            }
        }
        if (player.body.touching.down && !cursors.left.isDown && !cursors.right.isDown && !cursors.up.isDown && !space.isDown) {
            player.animations.play('playerIdle');
        }


    },

    startRightLoop: function () {
        player.play('playerJumpRightLoop');
    },
    startLeftLoop: function () {
        player.play('playerJumpLeftLoop');
    },

    render: function () {

        //        // CAMERA DEBUG STATS
        //        this.game.debug.cameraInfo(this.game.camera, 32, 32);
        //        this.game.debug.spriteCoords(player, 32, 500);

        //        this.game.debug.body(player);
    },


    fade: function () {
        if (player.position.x + 20 > fire.position.x && player.position.y + (player.height / 2) < fire.position.y && player.position.x < fire.position.x + fire.width) {
            this.game.camera.fade(0x000000, 1000);
            player.body.immovable = true;
            player.body.velocity = 0;
            player.animations.play('playerIdle');
            this.game.time.events.add(Phaser.Timer.SECOND * 1.5, this.start, this).autoDestroy = true;
            menuMusic.stop();
        }
    },
    start: function () {

        this.game.state.start('play');
    }

};
