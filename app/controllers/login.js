const formidable = require('formidable')
const db = require('../services/db')

module.exports.get = (req, res) => {
  res.render('pages/login', { error: req.flash('error')[0] })
}

module.exports.post = (req, res, next) => {
  const form = new formidable.IncomingForm()

  form.parse(req, (err, fields) => {
    if (err) return next(err)

    const { email, password } = fields

    const userExists = db.user().isEqual({ email, password }).value()

    if (userExists) {
      req.session.isAdmin = true
      return res.redirect('/admin')
    }

    if (!email || !password) req.flash('error', 'Все поля обязательны для заполнения')
    else req.flash('error', 'Введен неверный логин или пароль')

    res.redirect('/login')
  })
}
