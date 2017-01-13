/**
 * This module handles the game logic.
 */
define(['lodash', 'core/pos'], function(_, Pos) {
	'use strict';
	
	function neighbours(pos) {
		var positions = [
			// The row above
			[pos.x - 1, pos.y - 1],
			[pos.x, pos.y - 1],
			[pos.x + 1, pos.y - 1],

			// The row below
			[pos.x - 1, pos.y + 1],
			[pos.x, pos.y + 1],
			[pos.x + 1, pos.y + 1],

			// Cell to the left
			[pos.x - 1, pos.y],

			// Cell to the right
			[pos.x + 1, pos.y]
		];

		return _.map(positions, function(pos) {
			return new Pos(pos[0], pos[1]);
		});
	}

	/**
	 * Calculate the next generation of the universe and advance the game state.
	 * @param state the actual game state
	 */
	function evolve(state) {
		var newState = {};
		newState.generation = state.generation + 1;

		newState.universe = _.map(state.universe, function(cell) {
			var env = neighbours(cell);
			var aliveNeighbours = _.filter(env, function(cell) {
				return _.find(state.universe, cell.eq.bind(cell));
			});
			var deadNeighbours = _.differenceWith(env, aliveNeighbours, function(a, b) {
				return a.eq(b);
			});

			var result = [];

			// Under- and overpopulation
			if (aliveNeighbours.length >= 2 && aliveNeighbours.length <= 3) {
				result.push(cell);
			}

			var reborn = _.flatten(_.map(deadNeighbours, function(cell) {
				var aliveNeighbours = _.filter(neighbours(cell), function(cell) {
					return _.find(state.universe, cell.eq.bind(cell));
				});

				var result = [];
				if (aliveNeighbours.length === 3) {
					if (!_.find(state.universe, cell.eq.bind(cell))) {
						result.push(cell);
					}
				}
				return result;
			}));

			return result.concat(reborn);
		});

		newState.universe = _.uniqWith(_.flatten(newState.universe), function(a, b) {
			return a.eq(b);
		});

		return newState;
	}

	return {
		evolve: evolve
	};
});