var menuState = {
    create: function() {
        var nameLabel = game.add.text(80, 80, 'Test game', {fontn : '50px Arial', fill: '#ffffff'});
        
        
        var startLabel = game.add.text(80, game.world.height-80, 'press the "w" key to start', {fontn : '25px Arial', fill: '#ffffff'});
        
        // adding Key press to a variable
        var Wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        
        // calling start function when key is pressed
        Wkey.onDown.addOnce(this.start, this);
        
    },
    
    start: function() {
        game.state.start('play');
    }
}