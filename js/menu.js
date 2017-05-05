var timer;
var titleTrigger = false;
var scrollPosition = 0;
var titleAlpha = 0;
var titlePosition = -92;
menuState = {
    create: function() {
        
       

        
        // adding Key press to a variable
        var SPACEkey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        // calling start function when key is pressed
        SPACEkey.onDown.addOnce(this.startIntro, this);
        
        menuBG = this.game.add.sprite(0,0,'mainMenuBG');
        menuBG.scale.setTo(2);
        menuBG.animations.add('bgPlay', [0, 1], 2, true);
        menuBG.animations.play('bgPlay');
        
        title = this.game.add.sprite(0,10,'title');
        title.scale.setTo(2);
        title.alpha = titleAlpha;
        title.position.y = titlePosition;
        
        //VERSION
        b = this.game.add.bitmapText( 5, 5, "PixelOperator", "ALPHA Version 1.0", 16);
        
        
        t = this.game.add.bitmapText( this.game.world.centerX, gameHeight - 50, "PixelOperator", "Press SPACEBAR to begin", 32);
        t.align = "center";
        t.anchor.setTo(0.5, 0);
        t.scale.set(1);
        t.alpha = 1;
        
        this.game.time.events.loop(Phaser.Timer.SECOND, this.blinkText, this);
       
        // MUSIC LOAD & PLAY
        menuMusic = this.game.add.audio('nightcall');
        menuMusic.loop = true;
        menuMusic.play();
        
    },
    update: function() {
        
        menuBG.position.y = scrollPosition ;
        title.alpha = titleAlpha;
        title.position.y = titlePosition;
        
        if(scrollPosition <= 0 && scrollPosition > -392){
        scrollPosition -=1;
        } else {
            scrollPosition = -392;
        }
        if(scrollPosition < -391){
            titleTrigger = true;
        }
        if(titleTrigger === true){
            titleAlpha += .1;
            titlePosition += 10;
        }
        if(titlePosition >= 20){
            titlePosition = 20;
        }
        if(titleAlpha >= 1){
            titleAlpha = 1;
        }
    },
    blinkText: function() {
        if(t.alpha == 1){
            t.alpha = 0;
        } else {
            t.alpha = 1;
        }
    },
    
    startIntro: function() {
        this.game.state.start('gameIntro');
    }
};