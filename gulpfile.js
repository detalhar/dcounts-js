const gulp = require('gulp')
const standard = require('gulp-standard')
const connect = require('gulp-connect')
const runSequence = require('run-sequence')
const babili = require('gulp-babili');
const rename = require('gulp-rename');
const ghPages = require('gulp-gh-pages')
require('gulp-release-tasks')(gulp)

gulp.task('connect', () => {
  connect.server({
    root: './demo',
    port: 7000,
    livereload: true
  })
})

gulp.task('html', () => {
  gulp.src(['./demo/*.html', './demo/*.html'])
    .pipe(connect.reload())
})

gulp.task('minify', () => {
  gulp.src('./src/dcounts-js.js')
    .pipe(babili({
      mangle: {
        keepClassNames:true
      }
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./src'))
})

gulp.task('copy', () => {
  gulp.src('./src/dcounts-js.min.js')
    .pipe(gulp.dest('./demo/'))
})

gulp.task('standard', () => {
  gulp.src(['./src/dcounts-js.js'])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: false,
      quiet: true
    }))
    .pipe(connect.reload())
})

gulp.task('deploy', () => {
  gulp.src('./demo/**/*')
    .pipe(ghPages())
})

gulp.task('watch', () => {
  gulp.watch('./src/dcounts-js.js', ['build'])
  gulp.watch('./demo/**/*.{html,css}', ['html'])
})

gulp.task('build', () => {
  runSequence('standard', 'minify', 'copy')
})

gulp.task('server', () => {
  runSequence('build', 'connect', 'watch')
})
