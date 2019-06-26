const path = require('path')
const fs = require('fs')
const promisify = require('util').promisify

const link = promisify(fs.link)

const sortFilesStruct = files => {
  return files.reduce((acc, file) => {
    const fileName = path.basename(file)
    const firstLetter = fileName[0]

    return { ...acc,
      [firstLetter]: { ...(acc[firstLetter] || {}),
        [fileName]: file
      }
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

      Object.entries(sortFiles)
        .forEach(([fileName, originFilePath]) => {
          const destFilePath = path.join(letterDir, fileName)

          linkFilePromises.push(link(originFilePath, destFilePath))
        })
    })

  return Promise.all(linkFilePromises)
}
