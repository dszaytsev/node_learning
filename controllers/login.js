const db = require('../services/db')

exports.get = (ctx, next) => {
  ctx.render('login', { error: ctx.flash.get() })
}

exports.post = (ctx, next) => {
  const { email, password } = ctx.request.body

  const userExists = db.user().isEqual({ email, password }).value()

  if (!email || !password) ctx.flash.set('Все поля обязательны для заполнения')
  else if (!userExists) ctx.flash.set('Введен неверный логин или пароль')
  else {
    ctx.session.isAdmin = true
    return ctx.redirect('/admin')
  }

  ctx.redirect('/login')
}
