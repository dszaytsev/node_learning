const login = new require('koa-router')()
const loginController = require('../controllers/login')

login.get('/', loginController.get)
login.post('/', loginController.post)

module.exports = login
