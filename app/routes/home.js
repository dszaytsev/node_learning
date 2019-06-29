const homeController = require('../controllers/home')
const home = require('express').Router()

home.get('/', homeController.get)

module.exports = home
