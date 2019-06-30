const nodemailer = require('nodemailer')
const config = require('../config.json')

module.exports = ({ from = '', text = '' }) => {
  const transporter = nodemailer.createTransport(config.mail.smtp)

  return transporter.sendMail({
    from,
    to: config.mail.smtp.auth.user,
    subject: config.mail.subject,
    text
  })
}
