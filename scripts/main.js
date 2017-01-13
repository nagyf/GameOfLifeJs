'use strict';

/**
 * This module bootstraps the application by loading the app module with require.js.
 */
require.config({
    paths: {
        domready: 'lib/domready',
        lodash: 'lib/lodash.min',
        d3: 'lib/d3.min'
    }
});

// Bootstrap the application
requirejs(['app']);