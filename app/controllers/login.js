const db = require('../services/db')

module.exports.get = (req, res) => {
  res.render('pages/login')
}

module.exports.post = (req, res) => {
  const { email, password } = req.body

  const userExists = db.user().isEqual({ email, password }).value()

  if (userExists) {
    req.session.isAdmin = true
    return res.redirect('/admin')
  }

  res.redirect('/login')
}
