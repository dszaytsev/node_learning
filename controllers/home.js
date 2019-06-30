const db = require('../services/db')
const sendMail = require('../services/mailer')

exports.get = ctx => {
  ctx.render('index', {
    msgEmail: ctx.flash('msgEmail')[0],
    products: db.products.get(),
    skills: db.skills.get()
  })
}

exports.post = async ctx => {
  const fields = ctx.request.body

  if (Object.values(fields).some(f => !f)) {
    ctx.flash('msgEmail', 'Все поля обязательны для заполнения')
    ctx.redirect('/')
  }

  try {
    await sendMail({
      from: `${fields.email}: ${fields.name}`,
      text: fields.message
    })

    ctx.flash('msgEmail', 'Письмо успешно отправлено')
  } catch (err) {
    ctx.flash('msgEmail', 'При отправке письма произошла ошибка')
  } finally {
    ctx.redirect('/')
  }
}
