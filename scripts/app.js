/**
 * This is the main application module, that runs the main loop.
 */
requirejs(['domready!', 'core/renderer', 'core/game', 'core/pos'], function(doc, renderer, game, Pos) {
    'use strict';

    var options = {
        cell: {
            size: 10,
            color: 'black'
        },
        speed: 100
    };

    // Initialize the renderer module before doing anything else
    renderer.init(options);

    /**
     * The main application loop that evolves the universe and then renders it.
     * 
     * @param state the game state
     * @return {[type]}
     */
    function loop(state) {
        renderer.render(state);
        var newState = game.evolve(state);
        setTimeout(loop, options.speed, newState);
    }

    var startingUniverse = [{
        x: 30,
        y: 30
    }, {
        x: 31,
        y: 30
    }, {
        x: 30,
        y: 31
    }, {
        x: 30,
        y: 32
    }, {
        x: 29,
        y: 31
    }];

    startingUniverse = _.map(startingUniverse, function(o){
        return new Pos(o.x, o.y);
    });

    /**
     * Returns the initial game state with a starting universe.
     */
    function initialState() {
        return {
            generation: 1,
            universe: startingUniverse
        };
    }

    loop(initialState());
});