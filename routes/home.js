const home = new require('koa-router')()
const homeController = require('../controllers/home')

home.get('/', homeController.get)

module.exports = home
