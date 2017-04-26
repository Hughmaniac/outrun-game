
gameOverState = {
    create: function() {
      
        var winLabel =  this.game.add.text(80, 80, 'GAME OVER', {font: '50px "V5 Xtender"', fill: '#f00'});
        
        var startLabel = this.game.add.text(80, this.game.world.height-80, 'press SPACE to restart', {font: '25px Hellovetica', fill:'#ffffff'});
        
        var SPACEkey =  this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
         scoreText = this.game.add.bitmapText(gameWidth / 2, gameHeight / 2, "PressStart", recordedScore, 32);
         scoreText.anchor.set(0.5);
        
        SPACEkey.onDown.addOnce(this.restart, this);
    },
    restart: function() {
        this.game.state.start('menu');
    }
};