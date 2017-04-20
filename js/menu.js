var menuState = {
    create: function() {
        
        var nameLabel = this.game.add.text(80, 80, 'Test game', {font : '50px "V5 Xtender"', fill: '#ffffff'});
        
        
        var startLabel = this.game.add.text(80, this.game.world.height-80, 'press SPACE to start', {font : '25px Hellovetica', fill: '#ffffff'});
        
        // adding Key press to a variable
        var SPACEkey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        // calling start function when key is pressed
        SPACEkey.onDown.addOnce(this.startIntro, this);
        
        var t = this.game.add.bitmapText( this.game.world.centerX, 200, "PressStart", "Test Game", 32);
        t.align = "center";
        t.anchor.setTo(0.5, 0);
        t.scale.set(1);
    },
    
    startIntro: function() {
        this.game.state.start('gameIntro');
    }
};