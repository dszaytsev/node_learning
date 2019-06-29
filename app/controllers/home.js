const db = require('../services/db')

module.exports.get = (req, res) => {
  res.render('pages/index', {
    skills: db.skills.get(),
    products: db.products.get()
  })
}
