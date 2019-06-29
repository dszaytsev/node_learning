const db = require('../services/db')

module.exports.post = (req, res) => {
  const skillData = req.body
  const values = Object.values(skillData).map(value => parseInt(value))

  if (values.some(value => typeof value !== 'number'))
    req.flash('msgskill', 'Допускаются только цифры')
  else {
    const nextSkills = db.skills().value().map(skill => {
      return { ...skill, number: req.body[skill.field] || skill.number }
    })
    db.skills.set(nextSkills)
    req.flash('msgskill', 'Успешно сохранено')
  }

  res.redirect('/admin')
}
