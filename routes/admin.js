const admin = new require('koa-router')()
const adminController = require('../controllers/admin')

admin.get('/', adminController.get)

module.exports = admin
