const path = require('path')
const fs = require('fs')
const promisify = require('util').promisify

const link = promisify(fs.link)

const sortFilesStruct = files => {
  return files.reduce((acc, file) => {
    const letter = path.basename(file)[0]

    return { ...acc,
      [letter]: [...(acc[letter] || []), file]
    }
  }, {})
}

module.exports = (dirPath, files) => {
  const struct = sortFilesStruct(files)
  const linkFilePromises = []

  Object.entries(struct)
    .forEach(([letter, sortFiles]) => {
      const letterDir = path.join(dirPath, letter.toUpperCase())

      if (!fs.existsSync(letterDir)) fs.mkdirSync(letterDir)

      sortFiles.forEach(originFilePath => {
        const fileName = path.basename(originFilePath)
        const destFilePath = path.join(letterDir, fileName)

        linkFilePromises.push(link(originFilePath, destFilePath))
      })
    })

  return Promise.all(linkFilePromises)
}
