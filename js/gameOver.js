
gameOverState = {
    create: function() {
      
       
        background = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'gameOverBG');
        background.anchor.setTo(.5,.5);
        background.scale.setTo(2);
        background.animations.add('rollin',[0,1,2,3,4,5,6,7,8,9,10,11],15,true);
        background.animations.play('rollin');
        
        //VERSION
         b = this.game.add.bitmapText( 5, 5, "PixelOperator", "ALPHA Version 1.0", 16);
        
         var winLabel =  this.game.add.text(this.game.world.centerX, 20, 'GAME OVER', {font: '50px "V5 Xtender"', fill: '#fff'});
        winLabel.anchor.setTo(.5,0);
        winLabel.align = 'center';
        
        
        
         t = this.game.add.bitmapText( this.game.world.centerX, gameHeight - 50, "PixelOperator", "Press SPACEBAR to restart", 32);
        t.align = "center";
        t.anchor.setTo(0.5, 0);
        t.scale.set(1);
        t.alpha = 1;
        
        this.game.time.events.loop(Phaser.Timer.SECOND, this.blinkText, this);
        
        var SPACEkey =  this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
         scoreText = this.game.add.bitmapText(gameWidth / 2,100, "PressStart", recordedScore, 32);
         scoreText.anchor.set(0.5);
        
        scoreText.text = 'Score: ' + recordedScore;
        
        SPACEkey.onDown.addOnce(this.restart, this);
    },
    
    blinkText: function() {
        if(t.alpha == 1){
            t.alpha = 0;
        } else {
            t.alpha = 1;
        }
    },
    restart: function() {
        this.game.state.start('menu');
    }
};