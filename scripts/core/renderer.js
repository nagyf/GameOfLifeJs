/**
 * This module implements the rendering of the game.
 */
define(['d3', 'lodash'], function(d3, _) {
    'use strict';

    var root = d3.select('.universe');
    var svg = root.append('svg').attr('width', '100%').attr('height', '100%');
    var options = {};

    var generationText = svg.append('text');
    var populationText = svg.append('text');
    var bounds = root.node().getBoundingClientRect();

    /**
     * Initialize the game with the options.
     *  
     * @param opts the options of the application
     */
    function init(opts) {
        options = opts;
    }

    function getScales() {
        var domain = {
            w: Math.floor(bounds.width / options.cell.size),
            h: Math.floor(bounds.height / options.cell.size)
        };

        var scaleX = d3.scaleLinear().range([0, bounds.width]).domain([0, domain.w]);
        var scaleY = d3.scaleLinear().range([0, bounds.height]).domain([0, domain.h]);

        return {
            x: scaleX,
            y: scaleY
        };
    }

    /**
     * Renders the game state
     */
    function render(state) {
        bounds = root.node().getBoundingClientRect();
        var universe = _.filter(state.universe, function(cell) {
            return cell.x >= 0 && cell.y >= 0 && cell.x <= bounds.width && cell.y <= bounds.height;
        });

        var scale = getScales();
        var rects = svg.selectAll('rect').data(universe);

        rects.enter().append('rect');

        rects
            .attr('width', options.cell.size)
            .attr('height', options.cell.size)
            .attr('fill', options.cell.color)
            .attr('x', function(d) {
                return scale.x(d.x);
            })
            .attr('y', function(d) {
                return scale.y(d.y);
            });

        rects.exit().remove();

        generationText.attr('x', 10).attr('y', 20).text('Generation: ' + state.generation);
        populationText.attr('x', 10).attr('y', 40).text('Population: ' + state.universe.length);
    }

    return {
        init: init,
        render: render
    };
});