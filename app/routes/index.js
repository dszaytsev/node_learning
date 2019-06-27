const express = require('express')

const homeController = require('../controllers/home')
const loginController = require('../controllers/login')
const adminController = require('../controllers/admin')

const isAdmin = (req, res, next) => {
  if (req.session.isAdmin) return next()

  res.redirect('/404')
}

const router = express.Router()
router.get('/', homeController.get)

router.get('/admin', isAdmin, adminController.get)

router.get('/login', loginController.get)
router.post('/login', loginController.post)

router.get('/404', (_, res) => res.render('pages/404'))

module.exports = router
