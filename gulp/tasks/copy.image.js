'use strict'

module.exports = function() {
  $.gulp.task('copy:image', function() {
    return $.gulp.src('./client/images/**/*.*', { since: $.gulp.lastRun('copy:image') })
      .pipe($.gulp.dest($.config.root + '/assets/img'))
  })
}
