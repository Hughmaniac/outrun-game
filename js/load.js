loadState = {

    //preload all assets for the whole game
    preload: function () {
        //loading all assets
        this.game.load.image('player', 'assets/player.png');
        this.game.load.image('win', 'assets/win.png');
        this.game.load.image('floor', 'assets/floor.png');
        this.game.load.image('platform1', 'assets/platform.png');
        this.game.load.spritesheet('run', 'assets/run_spritesheet.png', 50, 50, 8);
        this.game.load.spritesheet('playerSprite', 'assets/player-spritesheet.png', 50, 50, 40);
        this.game.load.image('stagingBG', 'assets/staging-bg.png');
        this.game.load.image('car', 'assets/testarossa.png');
        this.game.load.image('scaffoldPlatform', 'assets/scaffold-platform.png');
        this.game.load.image('firePlatform', 'assets/fire-escape-platform.png');
        this.game.load.spritesheet('platforms', 'assets/platforms-spritesheet.png', 80, 47, 3);
        this.game.load.image('climb-bg', 'assets/climb-bg.png');
        this.game.load.spritesheet('title', 'assets/title-spritesheet.png', 211, 16, 40);
        this.game.load.spritesheet('mainMenuBG', 'assets/main-menu-spritesheet.png', 256, 420, 2);
        this.game.load.spritesheet('gameOverBG', 'assets/testarossa-BG.png', 256,256,12);

        //Load SoundFiles
        this.game.load.audio('nightcall', ['assets/sound/Nightcall.ogg', 'assets/sound/Nightcall.m4a', 'assets/sound/Nightcall.wav']);
        
       
        this.game.load.audio('deviance',['assets/sound/Deviance.ogg', 'assets/sound/Deviance.m4a', 'assets/sound/Deviance.wav']);
        this.game.load.audio('powerMove',['assets/sound/PowerMoveAlt.ogg', 'assets/sound/PowerMoveAlt.m4a', 'assets/sound/PowerMoveAlt.wav']);
        
        // fonts        
        this.game.load.bitmapFont('PressStart', 'assets/PressStart.png', 'assets/PressStart.xml');
        this.game.load.bitmapFont('PixelOperator', 'assets/pixelOperator.png', 'assets/pixelOperator.xml');
    },

    create: function () {
        //load the loading label
        var loadingLabel = this.game.add.text(80, 150, 'loading...', {
            font: '30px Courier',
            fill: '#ffffff'
        });
        //call menu state
        this.game.state.start('menu');
    }
};
