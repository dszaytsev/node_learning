const db = require('../services/db')

exports.get = (ctx, next) => {
  ctx.render('index', {
    products: db.products.get(),
    skills: db.skills.get()
  })
}
