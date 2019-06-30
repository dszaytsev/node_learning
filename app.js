const Koa = require('koa')

const app = new Koa()

// routing
app.use(require('./routes').routes())

app.listen(3000)
