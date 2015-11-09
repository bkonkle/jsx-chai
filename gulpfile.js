import babel from 'gulp-babel'
import gulp from 'gulp'
import sourcemaps from 'gulp-sourcemaps'

gulp.task('build', ['transpile', 'bundle'])

gulp.task('transpile', () => {
  return gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('lib'))
})

gulp.task('bundle', () => {
  return gulp.src('src/**/*.js')
    .pipe()
})
