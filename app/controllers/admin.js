const db = require('../services/db')

module.exports.get = (req, res) => {
  const skills = db.skills().value().reduce((acc, { field, number }) => {
    return { ...acc, [field]: number }
  }, {})

  res.render('pages/admin', { msgskill: req.flash('msgskill')[0], skills })
}
