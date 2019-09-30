require.config({
    paths: {
        'sapex': 'https://sawbona.github.io/apex'
    }
});

require(['sapex/g1/game'], function(game){
    console.log('game: ' + game);
});