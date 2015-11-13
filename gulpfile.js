import babel from 'gulp-babel'
import chalk from 'chalk'
import gulp from 'gulp'
import gutil from 'gulp-util'
import sourcemaps from 'gulp-sourcemaps'
import webpack from 'webpack'
import webpackConfig from './webpack.config'

gulp.task('build', ['build:transpile', 'build:bundle'])

gulp.task('build:transpile', () => {
  return gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('lib'))
})

gulp.task('build:bundle', done => {
  webpack(webpackConfig, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack', err)

    const statString = stats.toString({colors: true})

    gutil.log(`[build:bundle] ${chalk.cyan('Bundling complete!')} \n${statString}\n`)

    done()
  })
})
