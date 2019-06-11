const path = require('path')

module.exports = files => {
  return files.reduce((acc, file) => {
    const fileName = path.basename(file)
    const firstLetter = fileName[0]

    return { ...acc,
      [firstLetter]: { ...(acc[firstLetter] || {}),
        [fileName]: file // rewrite files which have same names
      }
    }
  }, {})
}
