var loadState = {
    
    //preload all assets for the whole game
    prelaod: function() {
        
        //load the loading label
        var loadingLabel = game.add.text(80, 150, 'loading...', {font: '30px Courier', fill: '#ffffff'});
        
        
        //loading all assets
        game.load.image('player', 'assets/test/player.png');
        game.load.image('win', 'assets/test/win.png');
    },
    
    create: function() {
        
        //call menu state
        game.state.start('menu');
    }
};