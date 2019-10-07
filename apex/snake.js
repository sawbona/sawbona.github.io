require.config({
    paths: {
        'sapex': 'https://sawbona.github.io/apex'
    }
});

/**
 * Main entry point from apex.oracle.com
 */
require(['sapex/snake/game'], function(game){
    game.start(20, 20);
});