const path = require('path')
const fs = require('fs')

const sortFilesStruct = files => {
  return files.reduce((acc, file) => {
    const letter = path.basename(file)[0]

    return { ...acc,
      [letter]: [...(acc[letter] || []), file]
    }
  }, {})
}

module.exports = (dirPath, files, callback) => {
  let fileCount = 0
  const struct = sortFilesStruct(files)

  Object.entries(struct)
    .forEach(([letter, sortFiles]) => {
      const letterDir = path.join(dirPath, letter.toUpperCase())

      if (!fs.existsSync(letterDir)) {
        fs.mkdirSync(letterDir)
      }

      sortFiles.forEach(originFilePath => {
        const fileName = path.basename(originFilePath)
        const destFilePath = path.join(letterDir, fileName)

        fs.link(originFilePath, destFilePath, err => {
          if (err && err.code !== 'EEXIST') {
            console.log(err)
          }

          if (++fileCount === files.length) {
            callback()
          }
        })
      })
    })
}
