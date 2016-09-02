let fs = require('fs');
let browserify = require('browserify');
let gulp = require('gulp');
let eslint = require('gulp-eslint');

gulp.task('lint', () => {
  gulp.src(['gulpfile.js', './example/*.js', './src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('default', ['lint'], () => {
  browserify('./src/simple.js')
    .transform('babelify', { presets: ['es2015', 'react'] })
    .bundle()
    .pipe(fs.createWriteStream('./public/simple.js'));
});
