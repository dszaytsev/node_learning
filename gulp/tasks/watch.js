'use strict'

module.exports = function() {
  $.gulp.task('watch', function() {
    $.gulp.watch('./client/js/**/*.js', $.gulp.series('js:process'))
    $.gulp.watch('./client/style/**/*.scss', $.gulp.series('sass'))
    $.gulp.watch('./client/template/**/*.pug', $.gulp.series('pug'))
    $.gulp.watch('./client/images/**/*.*', $.gulp.series('copy:image'))
  })
}
