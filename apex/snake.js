require.config({
    paths: {
        'sapex': 'https://sawbona.github.io/apex'
    }
});

require(['sapex/snake/game'], function(game){
    console.log('game: ' + game);
});