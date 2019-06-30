const home = new require('koa-router')()

home.get('/', (ctx, next) => { ctx.body = 'Home page' })

module.exports = home
