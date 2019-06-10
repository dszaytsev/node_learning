const path = require('path')
const fs = require('fs')

module.exports = dir => {
  const files = []

  const readDir = (base, level) => {
    const entities = fs.readdirSync(base)

    entities.forEach(entity => {
      const localBase = path.join(base, entity)
      const state = fs.statSync(localBase)

      state.isDirectory()
        ? readDir(localBase, level + 1)
        : files.push(localBase)
    })
  }

  readDir(dir, 0)

  return files
}
