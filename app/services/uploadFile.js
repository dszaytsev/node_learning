const path = require('path')
const fs = require('fs')
const generateId = require('../utils').generateID

module.exports = file => {
  const uploadDir = path.join(process.cwd(), 'app/public/uploads')
  const fileName = path.join(`${generateId()}${path.extname(file.name)}`)
  const filePath = path.join(uploadDir, fileName)

  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir)

  return new Promise((resolve, reject) => {
    fs.rename(file.path, filePath, err => {
      if (err) reject(err)

      resolve(path.join('uploads', fileName))
    })
  })
}
