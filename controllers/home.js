const formidable = require('formidable')
const db = require('../services/db')
const sendMail = require('../services/mailer')

module.exports.get = (req, res) => {
  res.render('pages/index', {
    skills: db.skills.get(),
    products: db.products.get(),
    msgEmail: req.flash('msgEmail')[0]
  })
}

module.exports.post = (req, res, next) => {
  const form = new formidable.IncomingForm()

  form.parse(req, async (err, fields) => {
    if (err) return next(err)

    if (Object.values(fields).some(f => !f))
      return res.flashRedirect('/', 'msgEmail', 'Все поля обязательны для заполнения')

    try {
      await sendMail({
        from: `${fields.email}: ${fields.name}`,
        text: fields.message
      })
      res.flashRedirect('/', 'msgEmail', 'Письмо успешно отправлено')
    } catch (err) {
      res.flashRedirect('/', 'msgEmail', 'При отправке письма произошла ошибка')
    }
  })
}
