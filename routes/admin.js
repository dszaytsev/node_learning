const admin = new require('koa-router')()

admin.get('/', (ctx, _next) => { ctx.body = 'Admin page'})

module.exports = admin
