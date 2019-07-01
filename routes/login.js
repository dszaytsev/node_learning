const loginController = require('../controllers/login')
const login = require('express').Router()

login.get('/', loginController.get)
login.post('/', loginController.post)

module.exports = login
