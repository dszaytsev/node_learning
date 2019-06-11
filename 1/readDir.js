const path = require('path')
const fs = require('fs')

module.exports = dir => {
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
