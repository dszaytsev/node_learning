const Koa = require('koa')
const Pug = require('koa-pug')
const config = require('./config.json')
const router = require('./routes')
const errorHandler = require('./middleware/errorHandler')

const app = new Koa()

// templates
const pug = new Pug(config.pug)
pug.use(app)

// body parser
app.use(require('koa-body')(config.bodyParser))

// session
app.use(require('koa-session')(config.session, app))

// flash messages
app.use(require('koa-better-flash')())

// include static
app.use(require('koa-static')('./public'))

// handling errors
app.use(errorHandler)

// routing
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000)
