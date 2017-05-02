loadState = {

    //preload all assets for the whole game
    preload: function () {

        //load the loading label
        var loadingLabel = this.game.add.text(80, 150, 'loading...', {
            font: '30px Courier',
            fill: '#ffffff'
        });


        //loading all assets
        this.game.load.image('player', '../assets/player.png');
        this.game.load.image('win', '../assets/win.png');
        this.game.load.image('floor', '../assets/floor.png');
        this.game.load.image('platform1', '../assets/platform.png');
        this.game.load.spritesheet('run', '../assets/run_spritesheet.png', 50, 50, 8);
        this.game.load.spritesheet('playerSprite', '../assets/player-spritesheet.png', 50, 50, 24);
        this.game.load.image('stagingBG', '../assets/staging-bg.png');
        this.game.load.image('car', '../assets/testarossa.png');
        this.game.load.image('scaffoldPlatform', '../assets/scaffold-platform.png');
        this.game.load.image('firePlatform', '../assets/fire-escape-platform.png');
        this.game.load.spritesheet('platforms', '../assets/platforms-spritesheet.png', 80, 20, 3);
        this.game.load.image('climb-bg', '../assets/climb-bg.png');

        //Load SoundFiles
        this.game.load.audio('nightcall', '../assets/sound/Nightcall.mp3');



        // fonts        
        this.game.load.bitmapFont('PressStart', '../assets/PressStart.png', '../assets/PressStart.xml');
    },

    create: function () {

        //call menu state
        this.game.state.start('menu');
    }
};
