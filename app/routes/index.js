const router = require('express').Router()

const admin = require('./admin')
const home = require('./home')
const login = require('./login')

const isAdmin = (req, res, next) => {
  if (req.session.isAdmin) return next()

  return next()
  res.redirect('/404')
}

router.use('/', home)
router.use('/admin', isAdmin, admin)
router.use('/login', login)

router.get('/404', (_, res) => res.render('pages/404'))

module.exports = router
