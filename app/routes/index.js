const express = require('express')

const indexController = require('../controllers/home')
const homeController = require('../controllers/login')
const adminController = require('../controllers/admin')

const router = express.Router()
router.get('/', indexController.get)
router.get('/login', homeController.get)
router.get('/admin', adminController.get)

router.get('/404', (_, res) => res.render('pages/404'))

module.exports = router
