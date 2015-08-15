var dest = './build/public',
markupdest = './build/public/www',
src = './src/public',
mui = './node_modules/material-ui/src';

module.exports = {
    babelify: {
        src: src + '/server/**/*.js'
    },
    browserSync: {
        proxy: "http://localhost:5000",
        //server: {
        //    // We're serving the src folder as well
        //    // for sass sourcemap linking
        //    baseDir: [markupdest, src]
        //},
        files: [
            dest + '/**'
        ]
    },
    markup: {
        src: src + "/www/**",
        dest: markupdest
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
