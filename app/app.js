const cookieParser = require('cookie-parser')
const session = require('express-session')
const express = require('express')
const logger = require('morgan')
const flash = require('connect-flash')
const path = require('path')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))

app.use(
  session({
    secret: 'wkcxiyw3ld9t01udlnvjw',
    key: 'sessionkey',
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 10 * 60 * 1000
    },
    saveUninitialized: false,
    resave: false
  })
)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(flash())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes'))

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, _req, res, _next) => {
  res.status(err.status || 500)

  if (err.status === 404) return res.redirect('/404')

  res.render('error', {
    message: err.message,
    error: err
  })
})

const server = app.listen(process.env.PORT || 3000, function () {
  console.log('Сервер запущен на порте: ' + server.address().port)
})
