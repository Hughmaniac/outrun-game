var bootState = {

    // Preload small assets for the loading screen
    preload: function () {

    },

    create: function () {
        this.game.stage.backgroundColor = '#124184';
//        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
//        this.game.scale.width = innerHeight * (1 + (1 / 3));
//        this.scale.height = innerHeight;
        this.game.smoothed = false;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.state.start('load');
    }
};
