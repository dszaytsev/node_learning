const fs = require('fs')
const readDir = require('./readDir')

module.exports = dir => {
  const [files, dirs] = readDir(dir)

  files.forEach(file => {
    fs.unlink(file, err => err && console.log(err))
  });

  ([dir, ...dirs]).reverse().forEach(localDir => {
    fs.rmdir(localDir, err => err && console.log(err))
  })
}
