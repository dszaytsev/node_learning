const path = require('path')
const fs = require('fs')

module.exports = (dirPath, sortFilesStruct) => {
  Object.entries(sortFilesStruct).forEach(([letter, files]) => {
    const letterDir = path.join(dirPath, letter).toUpperCase()

    if (!fs.existsSync(letterDir)) {
      fs.mkdir(letterDir, err => err && console.log(err))
    }

    Object.entries(files).forEach(([fileName, originFilePath]) => {
      const destPath = path.join(letterDir, fileName)

      if (!fs.existsSync(destPath)) {
        fs.link(originFilePath, destPath, err => err && console.log(err))
      }
    })
  })
}
