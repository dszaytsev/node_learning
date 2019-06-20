const fs = require('fs')
const path = require('path')
const utils = require('./utils')
const sort = require('./sort')
const dir = require('./dir')
const promisify = require('util').promisify

const mkdir = promisify(fs.mkdir)

const {
  src = path.join(__dirname, 'src'),
  dest = path.join(__dirname, 'dest'),
  remove
} = utils.getArgs();

(async function main() {
  if (!fs.existsSync(src)) {
    console.log((`Folder does not exist: ${src}`))
    return
  }

  const [files] = dir.read(src)

  try {
    if (!fs.existsSync(dest)) await mkdir(dest)

    await sort(dest, files)

    if (remove) await dir.rm(src)
  } catch (err) {
    console.log(err)
  }
})()
