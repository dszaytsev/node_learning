const formidable = require('formidable')
const db = require('../services/db')

module.exports.post = (req, res, next) => {
  const form = new formidable.IncomingForm()

  form.parse(req, (err, fields) => {
    if (err) return next(err)

    const values = Object.values(fields).map(value => parseInt(value))

    if (values.some(value => typeof value !== 'number'))
      return res.flashRedirect('/admin', 'msgSkill', 'Допускаются только цифры')

    updateSkills(fields)
    res.flashRedirect('/admin', 'msgSkill', 'Успешно сохранено')
  })
}

const updateSkills = skills => {
  const nextSKills = db.skills.get().map(skill => {
    return { ...skill,
      number: skills[skill.field] || skill.number
    }
  })
  db.skills.set(nextSKills)
}
