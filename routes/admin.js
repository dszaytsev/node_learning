const adminController = require('../controllers/admin')
const skillsController = require('../controllers/skills')
const admin = require('express').Router()

admin.route('/').get(adminController.get)
admin.route('/upload').post(adminController.upload)
admin.route('/skills').post(skillsController.post)

module.exports = admin
