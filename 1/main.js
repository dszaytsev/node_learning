const fs = require('fs')
const path = require('path')
const utils = require('./utils')
const sort = require('./sort')
const dir = require('./dir')

const {
  src = path.join(__dirname, 'src'),
  dest = path.join(__dirname, 'dest'),
  remove
} = utils.getArgs()

if (!fs.existsSync(src)) {
  console.log((`Folder does not exist: ${src}`))
} else {
  if (!fs.existsSync(dest)) {
    fs.mkdir(dest, err => err && console.log(err))
  }

  const [files] = dir.read(src)

  sort(dest, files, () => {
    if (remove) dir.rm(src)
  })
}
