const homeController = require('../controllers/home')
const home = require('express').Router()

home.get('/', homeController.get)
home.post('/', homeController.post)

module.exports = home
