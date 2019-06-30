const cookieParser = require('cookie-parser')
const session = require('express-session')
const express = require('express')
const logger = require('morgan')
const flash = require('connect-flash')
const path = require('path')
const flashRedirect = require('./middleware/flashRedirect')
const config = require('./config.json')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(session(config.session))
app.use(cookieParser())
app.use(flash())
app.use(flashRedirect())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes'))
app.use((_req, res) => res.redirect('/404'))

// error handler
app.use((err, _req, res, _next) => {
  res.status(err.status || 500)

  res.render('error', {
    message: err.message,
    error: err
  })
})

const server = app.listen(process.env.PORT || 3000, function () {
  console.log('Сервер запущен на порте: ' + server.address().port)
})
