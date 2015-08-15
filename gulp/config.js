var dest = './build/public',
src = './src/public',
mui = './node_modules/material-ui/src';

module.exports = {
    browserSync: {
        //proxy: "http://localhost:5000",
        server: {
            // We're serving the src folder as well
            // for sass sourcemap linking
            baseDir: [dest, src]
        },
        files: [
            dest + '/**'
        ]
    },
    markup: {
        src: src + "/www/**",
        dest: dest
    },
    browserify: {
        // Enable source maps
        debug: true,
        // A separate bundle will be generated for each
        // bundle config in the list below
        bundleConfigs: [{
            entries: src + '/app/app.js',
            dest: dest,
            outputName: 'app.js'
        }]
    }
};
