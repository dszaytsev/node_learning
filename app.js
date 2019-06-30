const Koa = require('koa')
const Pug = require('koa-pug')
const config = require('./config.json')

const app = new Koa()

// templates
const pug = new Pug(config.pug)
pug.use(app)

// include static
app.use(require('koa-static')('./public'))
// routing
app.use(require('./routes').routes())

app.listen(3000)
