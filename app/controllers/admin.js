const formidable = require('formidable')
const db = require('../services/db')
const { getUploadDir, uploadFile } = require('../services/uploadFile')

module.exports.get = (req, res) => {
  res.render('pages/admin', {
    skills: processSkills(),
    msgFile: req.flash('msgFile')[0],
    msgSkill: req.flash('msgSkill')[0],
  })
}

module.exports.upload = (req, res, next) => {
  const form = new formidable.IncomingForm()

  form.uploadDir = getUploadDir()

  form.parse(req, async (err, fields, files) => {
    if (err) return next(err)

    const { name, price } = fields

    if (!name || !price)
      return res.flashRedirect('/admin', 'msgFile', 'Все поля обязательны для заполнения')
    if (!files.photo.size)
      return res.flashRedirect('/admin', 'msgFile', 'Файл не прикреплен')

    try {
      const src = await uploadFile(files.photo)
      db.products.add({ src, name, price })
    } catch (err) {
      return next(err)
    }

    res.flashRedirect('/admin', 'msgFile', 'Продукт успешно добавлен')
  })
}

const processSkills = () => {
  return db.skills.get().reduce((acc, { field, number }) => {
    return { ...acc, [field]: number }
  }, {})
}

