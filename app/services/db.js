const low = require('lowdb')
const path = require('path')
const FileSync = require('lowdb/adapters/FileSync')

const dbPath = path.join(__dirname, '../db.json')
const adapter = new FileSync(dbPath)
const db = low(adapter)

db.defaults({
  products: [],
  skills: [],
  user: {}
}).write()

Object.keys(db.getState()).map(collection => {
  db[collection] = () => db.get(collection)
  db[collection].get = () => db.get(collection).value()
  db[collection].push = value => db[collection].push(value).write()
  db[collection].set = value => db.set(collection, value).write()
})


module.exports = db
