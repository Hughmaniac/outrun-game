var bootState = {

    // Preload small assets for the loading screen
    preload: function () {
        
        
        this.game.scale.minWidth = gameWidth;
        this.game.scale.minHeight = gameHeight;
        this.game.scale.maxWidth = gameWidth * 2;
        this.game.scale.maxHeight = gameHeight * 2;
        this.game.stage.scale.pageAlignHorizontally = true;
        this.game.stage.scale.pageAlignVertically = true;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
    },

    create: function () {
        this.game.stage.backgroundColor = '#124184';
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.game.state.start('load');
        
    }
};
