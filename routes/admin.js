const admin = new require('koa-router')()
const adminController = require('../controllers/admin')
const skillsController = require('../controllers/skills')

admin.get('/', adminController.get)
admin.post('/upload', adminController.upload)
admin.post('/skills', skillsController.post)

module.exports = admin
