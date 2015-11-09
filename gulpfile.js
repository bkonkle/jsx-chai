import babel from 'gulp-babel'
import gulp from 'gulp'
import pkg from './package.json'
import wrap from 'gulp-wrap'

gulp.task('transpile', () => {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('lib'))
})
