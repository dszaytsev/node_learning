const router = new require('koa-router')()

const home = require('./home')
const admin = require('./admin')
const login = require('./login')

router.use('/', home.routes())
router.use('/admin', admin.routes())
router.use('/login', login.routes())

router.get('/404', (ctx, next) => {
  ctx.render('404')
})

module.exports = router
