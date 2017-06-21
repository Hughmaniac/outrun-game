var timer;
var titleTrigger = false;
var scrollPosition = 0;

menuState = {
    create: function () {




        // adding Key press to a variable
        var SPACEkey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // calling start function when key is pressed
        SPACEkey.onDown.addOnce(this.startIntro, this);

        menuBG = this.game.add.sprite(0, 0, 'mainMenuBG');
        menuBG.scale.setTo(2);
        menuBG.animations.add('bgPlay', [0, 1], 2, true);
        menuBG.animations.play('bgPlay');

        title = this.game.add.sprite(this.game.world.centerX, 100, 'title');
        title.scale.setTo(2);
        title.anchor.setTo(.5, 0);

        title.animations.add('title-intro', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36], 15, false);
        title.animations.add('title-loop', [24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36], 15, true);

        //VERSION
        b = this.game.add.bitmapText(5, 5, "PixelOperator", "ALPHA Version 1.0", 16);


        t = this.game.add.bitmapText(this.game.world.centerX, gameHeight - 50, "PixelOperator", "Press SPACEBAR to begin", 32);
        t.align = "center";
        t.anchor.setTo(0.5, 0);
        t.scale.set(1);
        t.alpha = 1;

        this.game.time.events.loop(Phaser.Timer.SECOND, this.blinkText, this);

        // MUSIC LOAD & PLAY
        menuMusic = this.game.add.audio('nightcall');
        menuMusic.loop = true;
        menuMusic.play();

    },
    update: function () {

        menuBG.position.y = scrollPosition;

        if (scrollPosition <= 0 && scrollPosition > -392) {
            scrollPosition -= 1;
        } else {
            scrollPosition = -392;
        }
        if (scrollPosition == -391) {
            title.animations.play('title-intro', 15, false);

        }
        if (title.animations.frame == 36) {
            title.animations.play('title-loop', 15, true);
        }
    },

    blinkText: function () {
        if (t.alpha == 1) {
            t.alpha = 0;
        } else {
            t.alpha = 1;
        }
    },

    startIntro: function () {
        this.game.state.start('gameIntro');
    }
};
