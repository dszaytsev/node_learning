const path = require('path')
const fs = require('fs')

function readDir(dir) {
  const files = []
  const dirs = []

  const readDirFiles = (base, level) => {
    const entities = fs.readdirSync(base)

    entities.forEach(entity => {
      const localBase = path.join(base, entity)
      const state = fs.statSync(localBase)

      if (state.isDirectory()) {
        dirs.push(localBase)
        readDirFiles(localBase, level + 1)
      } else {
        files.push(localBase)
      }
    })
  }

  readDirFiles(dir, 0)

  return [files, dirs]
}

exports.read = readDir

exports.rm = dir => {
  const [files, dirs] = readDir(dir)

  files.forEach(file => {
    fs.unlink(file, err => err && console.log(err))
  });

  ([dir, ...dirs]).reverse().forEach(localDir => {
    fs.rmdir(localDir, err => err && console.log(err))
  })
}
