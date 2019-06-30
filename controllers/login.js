const db = require('../services/db')

exports.get = ctx => {
  if (ctx.session.isAdmin) return ctx.redirect('/admin')

  ctx.render('login', { error: ctx.flash('error')[0] })
}

exports.post = ctx => {
  const { email, password } = ctx.request.body

  const userExists = db.user().isEqual({ email, password }).value()

  let err = ''

  if (!email || !password) err =  'Все поля обязательны для заполнения'
  else if (!userExists) err = 'Введен неверный логин или пароль'
  else {
    ctx.session.isAdmin = true
    return ctx.redirect('/admin')
  }

  ctx.flash('error', err)
  ctx.redirect('/login')
}
