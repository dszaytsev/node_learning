const admin = new require('koa-router')()
const adminController = require('../controllers/admin')
const isAdmin = require('../middleware/isAdmin')

admin.get('/', isAdmin, adminController.get)

module.exports = admin
