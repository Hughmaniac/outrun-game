var menuState = {
    create: function() {
        
        var nameLabel = this.game.add.text(80, 80, 'Test game', {font : '50px Arial', fill: '#ffffff'});
        
        
        var startLabel = this.game.add.text(80, this.game.world.height-80, 'press the "w" key to start', {font : '25px Arial', fill: '#ffffff'});
        
        // adding Key press to a variable
        var Wkey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        
        // calling start function when key is pressed
        Wkey.onDown.addOnce(this.start, this);
        
    },
    
    start: function() {
        this.game.state.start('play');
    }
}