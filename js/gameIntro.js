var cursors;
var run, idle1;
gameIntroState = {

    preload: function () {


    },

    create: function () {

        var nameLabel = this.game.add.text(80, 80, 'Intro', {
            font: '50px Hellovetica',
            fill: '#ffffff'
        });

        //KEYBINDINGS

        cursors = this.game.input.keyboard.createCursorKeys();


        // SPRITE INITIALIZATION


        BG = this.game.add.sprite(0, 0, 'stagingBG');
        scaffold = this.game.add.sprite(20, 214, 'scaffoldPlatform');
        fire = this.game.add.sprite(174, 120, 'firePlatform');
        player = this.game.add.sprite(16, 200, 'playerSprite');
        car = this.game.add.sprite(20, 348, 'car');
        win = this.game.add.sprite(gameWidth - 50, gameHeight - 256, 'win');

        bottomWall = this.game.add.sprite(0, gameHeight - 50);

        // SPRITE SETTINGS
        player.scale.setTo(2, 2);
        player.anchor.setTo(.5, .5);

        BG.scale.setTo(2, 2);
        car.scale.setTo(2, 2);
        scaffold.scale.setTo(2);
        fire.scale.setTo(2);

        // SPRITE ANIMATIONS

        player.animations.add('playerIdle', [0, 1, 2, 3]);
        player.animations.add('playerRunRight', [8, 9, 10, 11, 12, 13, 14, 15]);
        player.animations.add('playerRunLeft', [23, 22, 21, 20, 19, 18, 17, 16]);

        player.animations.play('playerIdle', 2, true);


        // SPRITE PHYSICS/BODY SETTINGS
        this.game.physics.arcade.enable([player, win, bottomWall, fire, scaffold]);

        player.body.collideWorldBounds = true;
        player.body.gravity.y = 1400;
        player.body.maxVelocity.y = 500;
        player.body.setSize(30, 50);

        win.body.allowGravity = false;
        win.body.immovable = true;

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

        // when player and win sprite overlap, the win function is called.
        this.game.physics.arcade.overlap(player, win, this.fade, null, this);

        this.game.physics.arcade.collide(bottomWall, player);
        this.game.physics.arcade.collide(scaffold, player);
        this.game.physics.arcade.collide(fire, player);

        // X AXIS MOVEMENT
        if (cursors.left.isDown) {
            player.body.velocity.x = -300;
            player.animations.play('playerRunLeft', 15, true);


        } else if (cursors.right.isDown) {
            player.body.velocity.x = 300;
            player.animations.play('playerRunRight', 15, true);

        } else {
            player.body.velocity.x = 0;
            player.animations.play('playerIdle', 2, true);

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

    },

    render: function () {

        //        // CAMERA DEBUG STATS
        //        this.game.debug.cameraInfo(this.game.camera, 32, 32);
        //        this.game.debug.spriteCoords(player, 32, 500);

        this.game.debug.body(player);
    },


    fade: function () {
        this.game.camera.fade(0x000000, 1000);
        player.body.immovable = true;
        this.game.time.events.add(Phaser.Timer.SECOND * 1.5, this.start, this).autoDestroy = true;
    },
    start: function () {
        this.game.state.start('play');
    }

};
