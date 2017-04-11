var playState = {
    create: function() {
        
        this.keyboard = game.input.keyboard;
        
        this.player = game.add.sprite(16, 16, 'player');
        game.physics.enable(this.player, Phaser.Physics.ARCADE);
        
        this.win = game.add.sprite(256, 256, 'win');
        game.physics.enable(this.win, Phaser.Physics.ARCADE)
    },
    
    update: function() {
        
        // when player and win sprite overlap, the win function is called.
        
        game.physics.arcade.overlap(this.player, this.win, this.gameOver, null, this);
        
        
        // Setting up velocity to keypresses
        if (this.keyboard.isDown(Phaser.Keyboard.A)) {
            this.player.body.velocity.x = -175;
        } else if (this.keyboard.isDown(Phaser.Keyboard.D)) {
            this.player.body.velocity.x = 175;
        } else {
            this.player.body.velocity.x = 0;
        }
        
        if (this.keyboard.isDown(Phaser.Keyboard.W)) {
            this.player.body.velocity.y = -175;
        } else if (this.keyboard.isDown(Phaser.Keyboard.S)) {
            this.player.body.velocity.y = 175;
        } else {
            this.player.body.velocity.y = 0;
        }
        
    },
    
    gameOver: function() {
        game.state.start('gameOver');
    } 
}