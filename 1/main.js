const fs = require('fs')
const path = require('path')
const readDir = require('./readDir')

const src = path.join(__dirname, 'src')
const dest = path.join(__dirname, 'dest')
fs.mkdir(dest, err => err && console.log(err))

const files = readDir(src)
let sortFiles = {}

files.forEach(file => {
  let fileName = path.basename(file)
  let firstLetter = fileName[0]

  sortFiles = {
    ...sortFiles,
    [firstLetter]: [...(sortFiles[firstLetter] || []), file]
  }
})

Object.entries(sortFiles).forEach(([letter, files]) => {
  let dir = path.join(dest, letter)
  fs.mkdir(dir, err => err && console.log(err))

  files.forEach(file => {
    let fileName = path.basename(file)
    let filePath = path.join(dir, fileName)

    fs.link(file, filePath, err => {
      if (err) {
        console.log('file exists ', file)
      }
    })
  })
})
