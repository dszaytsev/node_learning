module.exports = async (ctx, next) => {
  try {
    await next()
    if (ctx.status === 404) ctx.throw(404)
  } catch (err) {
    if (ctx.status === 404) ctx.redirect('/404')
    else {
      ctx.status = err.status || 500
      ctx.render('error', {
        status: err.status,
        message: err.message,
        stack: err.stack
      })
    }
  }
}
