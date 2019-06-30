const db = require('../services/db')

exports.get = (ctx, next) => {
  ctx.render('admin', {
    skills: processSkills()
  })
}

const processSkills = () => {
  return db.skills.get().reduce((acc, { field, number }) => {
    return { ...acc, [field]: number }
  }, {})
}
