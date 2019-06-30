const login = new require('koa-router')()

login.get('/', (ctx, body) => { ctx.body = 'Login page' })

module.exports = login
