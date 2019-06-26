const path = require('path')
const fs = require('fs')
const randomWords = require('random-words')
const rimraf = require('rimraf')

const srcDir = path.join(__dirname, 'src')
const folders = [
  srcDir,
  path.join(srcDir, 'nested'),
  path.join(srcDir, 'nested', 'nestedNesting'),
  path.join(srcDir, 'files'),
  path.join(srcDir, 'foo')
]

rimraf(srcDir, () => {
  folders.forEach(folder => {
    fs.mkdirSync(folder, err => { if (err) throw err })
  })

  randomWords(100).forEach(word => {
    const folderIndex = Math.floor(Math.random() * folders.length)
    const folder = folders[folderIndex]

    fs.writeFile(path.join(folder, word), word, err => {
      if (err) throw err
    })
  })
})
