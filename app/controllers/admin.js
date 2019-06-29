const db = require('../services/db')

module.exports.get = (req, res) => {
  const skills = db.skills().value().reduce((acc, { field, number }) => {
    return { ...acc, [field]: number }
  }, {})

  res.render('pages/admin', { msgskill: req.flash('msgskill')[0], skills })
}

module.exports.setSkills = (req, res) => {
  const skillData = req.body
  const values = Object.values(skillData).map(value => parseInt(value))

  if (values.some(value => typeof value !== 'number'))
    req.flash('msgskill', 'Допускаются только цифры')
  else {
    const nextSkills = db.skills().value().map(skill => {
      return { ...skill, number: req.body[skill.field] || skill.number }
    })
    db.skills.set(nextSkills)
    req.flash('msgskill', 'Успешно обновлено')
  }

  res.redirect('/admin')
}
