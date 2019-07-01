const db = require('../services/db')

exports.post = ctx => {
  const fields = ctx.request.body

  updateSkills(fields)
  ctx.flash('msgSkill', 'Успешно сохранено')
  ctx.redirect('/admin')
}

const updateSkills = skills => {
  const nextSKills = db.skills.get().map(skill => {
    return { ...skill,
      number: parseInt(skills[skill.field]) || skill.number
    }
  })
  db.skills.set(nextSKills)
}
