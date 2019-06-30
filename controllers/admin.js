const db = require('../services/db')
const uploadFile = require('../services/uploadFile')

exports.get = ctx => {
  ctx.render('admin', {
    skills: processSkills(),
    msgSkill: ctx.flash('msgSkill')[0],
    msgFile: ctx.flash('msgFile')[0]
  })
}

exports.upload = async ctx => {
  const { name, price } = ctx.request.body
  const photo = ctx.request.files.photo

  const err = validateForm({ name, price, photo })
  if (err) {
    ctx.flash('msgFile', err)
    return ctx.redirect('/admin')
  }

  try {
    const src = await uploadFile(photo)

    db.products.add({ src, name, price })
    ctx.flash('msgFile', 'Продукт успешно добавлен')
    ctx.redirect('/admin')
  } catch (err) {
    ctx.throw(500, err)
  }
}

const processSkills = () => {
  return db.skills.get().reduce((acc, { field, number }) => {
    return { ...acc, [field]: number }
  }, {})
}

const validateForm = ({ name, photo, price }) => {
  if (!name || !price) return 'Все поля обязательны для заполнения'
  if (!photo) return 'Файл не прикреплен'
}
