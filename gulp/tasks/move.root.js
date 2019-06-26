'use strict';

module.exports = function() {
  $.gulp.task('copy:root', function() {
    return $.gulp.src('./client/root/**/*.*', { since: $.gulp.lastRun('copy:root') })
      .pipe($.gulp.dest($.config.root));
  });
};
