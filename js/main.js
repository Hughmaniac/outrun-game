var gameWidth = 640;
var gameHeight = 480;


$(document).ready( function() {
    
var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'gameDiv', null, false, false);

    game.state.add('boot', bootState);
    game.state.add('load', loadState);
    game.state.add('menu', menuState);
    game.state.add('gameIntro', gameIntroState);
    game.state.add('play', playState);
    game.state.add('gameOver', gameOverState);
    
    game.state.start('boot');
    

});