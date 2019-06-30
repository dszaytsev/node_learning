const login = new require('koa-router')()
const loginController = require('../controllers/login')

login.get('/', loginController.get)

module.exports = login
