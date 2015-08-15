var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');

gulp.task('babelify', function () {
    return gulp.src('src/server/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('server.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build'));
});