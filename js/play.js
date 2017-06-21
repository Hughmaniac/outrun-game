var player, jumpButton, platform, platforms, cursors, space;
var total = 0;
var jumpKey;
var leftKey;
var rightKey;
var jumpTimer = 0;
var gameSpeedPlatform = 150;
var platformWidth;
var masterTimer;
var score = 0;
var scoreText;
var music;
var backgroundSpeed = 1.25;

playState = {

    create: function () {
        // CAMERA TRANSITION EFFECT
        this.game.camera.flash(0x000000, 1000);


        // MUSIC LOAD & PLAY
        music = this.game.add.audio('deviance');
        music.loop = true;
        music.play();

        //ENABLE ARCADE PHYSICS
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // KEYBINDINGS
        cursors = this.game.input.keyboard.createCursorKeys();
        space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // CALL IN BACKGROUND IMAGE
        parallax = this.game.add.sprite(0, gameHeight, 'mainMenuBG');
        parallax.scale.setTo(2);
        parallax.anchor.setTo(0, 1);
        background = this.game.add.tileSprite(0, 0, gameWidth, gameHeight, 'climb-bg');

        //VERSION
        b = this.game.add.bitmapText(5, 5, "PixelOperator", "ALPHA Version 1.0", 16);


        //GET DIMENSIONS OF PLATFORM BOUNDING BOX
        this.tileWidth = this.game.cache.getImage('platforms').width;
        this.tileHeight = this.game.cache.getImage('platforms').height / 3;

        //PLATFORM SPEED RESET
        gameSpeedPlatform = 150;

        // PLATFORM GENERATION
        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;
        this.platforms.createMultiple(100, 'platforms');
        this.timer = this.game.time.events.loop(1500, this.addPlatform, this);
        this.platforms.setAll('body.checkCollision.down', false);
        this.platforms.setAll('body.checkCollision.left', false);
        this.platforms.setAll('body.checkCollision.right', false);

        // SPRITE INITIALIZATION
        player = this.game.add.sprite(70, 0, 'playerSprite');
        initPlatform = this.game.add.sprite(0, 50, 'platforms');
        leftWall = this.game.add.sprite(0, -200);
        rightWall = this.game.add.sprite(gameWidth - 1, -200);
        bottomWall = this.game.add.sprite(0, gameHeight);

        // SPRITE SETTINGS
        initPlatform.frame = 2;
        initPlatform.scale.setTo(2);
        player.anchor.setTo(.5, .5);
        player.scale.setTo(2);


        // SPRITE ANIMATIONS
        player.animations.add('playerIdle', [0, 1, 2, 3], 2, true);
        player.animations.add('playerRunRight', [8, 9, 10, 11, 12, 13, 14, 15], 15, true);
        player.animations.add('playerRunLeft', [23, 22, 21, 20, 19, 18, 17, 16], 15, true);
        player.animations.add('playerJumpRight', [24, 25, 26, 27, 28, 29], 15, false);
        player.animations.add('playerJumpLeft', [37, 36, 35, 34, 33, 32], 15, false);
        player.animations.add('playerJumpLoopRight', [28, 29], 15, true);
        player.animations.add('playerJumpLoopLeft', [32, 33], 15, true);
        player.animations.play('playerIdle');

        //SCROLLING BACKGROUND SPEED
        background.scale.setTo(2);

        // SPRITE BODY/PHYSICS SETTINGS
        this.game.physics.arcade.enable([player, initPlatform, leftWall, rightWall, bottomWall]);
        player.body.gravity.y = 3000;
        player.body.maxVelocity.y = 3000;
        player.body.setSize(30, 50, 10, 0);
        initPlatform.body.velocity.y = 100;
        initPlatform.body.immovable = true;
        initPlatform.body.setSize(80, 4, 0, 33);

        // WORLD INVISIBLE WALL PARAMETERS
        leftWall.scale.x = 1;
        leftWall.scale.y = gameHeight + 200;
        leftWall.body.immovable = true;
        rightWall.scale.x = 1;
        rightWall.scale.y = gameHeight + 200;
        rightWall.body.immovable = true;
        bottomWall.scale.x = gameWidth;
        bottomWall.scale.y = 10;
        bottomWall.body.immovable = true;

        // GAME TIMER FOR SPEED SHIFTS
        this.game.time.events.add(Phaser.Timer.SECOND * 30, this.speed1, this);
        this.game.time.events.add(Phaser.Timer.SECOND * 60, this.speed2, this);
        this.game.time.events.add(Phaser.Timer.SECOND * 90, this.speed3, this);
        this.game.time.events.add(Phaser.Timer.SECOND * 120, this.speed4, this);

        // RESET SCORE/GAME SPEED
        score = 0;
        gameSpeedPlatform = 150;
        backgroundSpeed = 1.25;

        // SCORE KEEPER
        scoreText = this.game.add.bitmapText(gameWidth / 2, 20, "PressStart", 'score: 0', 15);
        scoreText.anchor.set(0.5);

        //LEVEL COUNTER
        levelText = this.game.add.bitmapText(gameWidth / 2, 40, "PressStart", 'level: 1', 15);
        levelText.anchor.set(0.5);

        // FOR DEBUGGING
        //            player.body.collideWorldBounds = true;

    },

    update: function () {

        //BACKGROUND SPEED
        background.tilePosition.y += backgroundSpeed;
        parallax.position.y += .1;

        // COLLISION
        this.game.physics.arcade.collide(player, this.platforms);
        this.game.physics.arcade.collide(player, initPlatform);
        this.game.physics.arcade.collide(player, leftWall);
        this.game.physics.arcade.collide(player, rightWall);


        // OVERLAP FUNCTION CALLS
        this.game.physics.arcade.overlap(player, bottomWall, this.gameOver, null, this);
        this.game.physics.arcade.overlap(player, bottomWall, this.recordScore, null, this);

        //PLAYER MOVEMENT
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
            if (cursors.up.isDown && cursors.right.isDown) {
                player.animations.play('playerJumpRight');
                player.animations.paused = true;
                player.animations.paused = false;
                player.animations.currentAnim.onComplete.add(this.startRightLoop, this);
            } else if (cursors.up.isDown) {
                player.animations.play('playerJumpRight');
                player.animations.paused = true;
                player.animations.paused = false;
                player.animations.currentAnim.onComplete.add(this.startRightLoop, this);

            }

            if (cursors.up.isDown && cursors.left.isDown) {
                player.animations.play('playerJumpLeft');
                player.animations.paused = true;
                player.animations.paused = false;
                player.animations.currentAnim.onComplete.add(this.startRightLoop, this);
            } else if (cursors.up.isDown) {
                player.animations.play('playerJumpRight');
                player.animations.paused = true;
                player.animations.paused = false;
                player.animations.currentAnim.onComplete.add(this.startRightLoop, this);

            }
        }
        if (player.body.touching.down && !cursors.left.isDown && !cursors.right.isDown && !cursors.up.isDown && !space.isDown) {
            player.animations.play('playerIdle');
        }


        // COUNT UP SCOREKEEPER
        score += 1;
        scoreText.text = 'Score: ' + score;
    },

    startRightLoop: function () {
        player.play('playerJumpRightLoop');
    },
    startLeftLoop: function () {
        player.play('playerJumpLeftLoop');
    },
    // SET PARAMETERS FOR THE PLATFORMS
    addTile: function (x, y) {
        //Get a tile that is not currently on screen
        var tile = this.platforms.getFirstDead();

        //Reset it to the specified coordinates
        tile.reset(x, y);
        tile.body.velocity.y = gameSpeedPlatform;
        tile.body.immovable = true;
        tile.scale.setTo(2);

        //When the tile leaves the screen, kill it
        tile.checkWorldBounds = true;
        tile.outOfBoundsKill = true;
        tile.frame = Math.floor(Math.random() * 3);

        if (tile.frame == 0) {
            tile.body.setSize(40, 8, 20, 38);
        }
        if (tile.frame == 1) {
            tile.body.setSize(49, 6, 13, 33)
        }
        if (tile.frame == 2) {
            tile.body.setSize(80, 4, 0, 33);
        }
    },

    // GENERATE RANDOM NUMBER FOR X VALUE
    addPlatform: function (y) {
        //If no y position is supplied, render it just outside of the screen
        if (typeof (y) == "undefined") {
            y = -94;
        }

        platformWidth = this.tileWidth;

        this.addTile(this.getRandomInt(), y);
    },

    // GENERATE RANDOM INTERGER BETWEEN 0 AND GAMEWIDTH
    getRandomInt: function () {
        return Math.floor(Math.random() * 350);
    },

    // PARAMETERS FOR LEVEL 2
    speed1: function () {
        //FALL SPEED OF PLATFORMS
        gameSpeedPlatform = 200;
        //SPAWNRATE OF PLATFORMS
        this.timer.delay = 1000;
        //SPEED OF BACKGROUND
        backgroundSpeed = 1.66;
        levelText.text = 'Level: 2';
        music.stop();
        music = this.game.add.audio('powerMove');
        music.loop = true;
        music.play();
    },

    // PARAMETERS FOR LEVEL 3
    speed2: function () {
        gameSpeedPlatform = 250;
        this.timer.delay = 1000;
        backgroundSpeed = 2.075;
        levelText.text = 'Level: 3';
    },

    // PARAMETERS FOR LEVEL 4
    speed3: function () {
        gameSpeedPlatform = 275;
        this.timer.delay = 700;
        backgroundSpeed = 2.49;
        levelText.text = 'Level: 4';

    },

    // PARAMETERS FOR LEVEL 5
    speed4: function () {
        gameSpeedPlatform = 300;
        this.timer.delay = 700;
        backgroundSpeed = 2.716363;
        levelText.text = 'Level: 5';

    },

    //RECORD SCORE IN VARIABLE FOR DISPLAY IN GAMEOVER GAME STATE
    recordScore: function () {
        recordedScore = score;
    },

    // DEBUGGING PURPOSES
    render: function () {
        // CAMERA DEBUG STATS
        //               this.game.debug.cameraInfo(this.game.camera, 32, 32);
        //               this.game.debug.spriteCoords(player, 32, 500);


        //         BOUNDING BOX DEBUG
//        this.game.debug.body(player);
//        this.game.debug.body(leftWall);
//        this.game.debug.body(rightWall);
//        this.platforms.forEach(this.renderGroup, this);
    },
    renderGroup: function (member) {
        this.game.debug.body(member);
    },

    //CALL NEXT GAMESTATE
    gameOver: function () {
        music.stop();
        this.game.state.start('gameOver');
    }
};
