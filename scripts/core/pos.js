/**
 * This module exports a Pos class, that can be used to represent a 2 dimensional position on a grid.
 */
define(function() {
	'use strict';

	function Pos(x, y) {
		this.x = x;
		this.y = y;

		/**
		 * Equality function that compares 2 postions
		 */
		this.eq = function(pos) {
			return this.x === pos.x && this.y === pos.y;
		}
	}

	return Pos;
});