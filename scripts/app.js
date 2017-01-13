/**
 * This is the main application module, that runs the main loop.
 */
requirejs(['domready!', 'lodash', 'd3', 'renderer', 'game'], function(doc, _, d3, renderer, game) {
	'use strict';

	var options = {
		cell: {
			size: 10,
			color: 'black'
		},
		speed: 500
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
		console.log('Generation: ' + state.generation);

		var newState = game.evolve(state);
		setTimeout(loop, options.speed, newState);
	}

	var startingUniverse = [{
		x: 10,
		y: 10
	}, {
		x: 11,
		y: 10
	}, {
		x: 12,
		y: 10
	}, {
		x: 9,
		y: 11
	}, {
		x: 10,
		y: 11
	}, {
		x: 11,
		y: 11
	}];

	startingUniverse = _.map(startingUniverse, function(o){
		return new game.Pos(o.x, o.y);
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