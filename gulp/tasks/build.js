var gulp = require('gulp');

//gulp.task('build', ['browserify', 'markup']);
gulp.task('build', ['babelify', 'browserify', 'markup']);
