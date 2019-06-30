module.exports = (ctx, next) => {
  if (!ctx.session.isAdmin) ctx.throw(404)

  next()
}
