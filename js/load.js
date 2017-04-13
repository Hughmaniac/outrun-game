
var loadState = {
    
    //preload all assets for the whole game
    preload: function() {
        
        //load the loading label
        var loadingLabel = this.game.add.text(80, 150, 'loading...', {font: '30px Courier', fill: '#ffffff'});
        
        
        //loading all assets
        this.game.load.image('player', '../assets/player.png');
        this.game.load.image('win', '../assets/win.png');
        this.game.load.image('floor', '../assets/floor.png');
        this.game.load.image('platform', '../assets/platform.png');
    },
    
    create: function() {
        
        //call menu state
        this.game.state.start('menu');
    }
};