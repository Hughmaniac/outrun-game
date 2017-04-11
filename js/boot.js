var bootState = {
    
    // Preload small assets for the loading screen
    preload: function() {
    },
    
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.state.start('load');
    }
};