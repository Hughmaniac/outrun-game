var gameOverState = {
    create: function() {
      
        var winLabel =  this.game.add.text(80, 80, 'You Win!', {font: '50px Arial', fill: '#00ff00'});
        
        var startLabel = this.game.add.text(80, this.game.world.height-80, 'press the w key to restart', {font: '25px Arial', fill:'#ffffff'});
        
        var Wkey =  this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        
        Wkey.onDown.addOnce(this.restart, this);
    },
    restart: function() {
        this.game.state.start('menu');
    }
}