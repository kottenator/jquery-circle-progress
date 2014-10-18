// Karma configuration
module.exports = function(config) {
    config.set({
        frameworks: ['qunit'],
        files: [
            { pattern: 'tests/images/circle.png', served: true, watched: false, included: false },
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/modernizr/modernizr.js',
            'dist/circle-progress.js',
            'tests/test_utils.js',
            'tests/tests.js'
        ],
        browsers: ['Firefox', 'PhantomJS'],
        singleRun: true
    });
};
