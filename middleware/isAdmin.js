module.exports = async (ctx, next) => {
  if (!ctx.session.isAdmin) ctx.throw(404)

  await next()
}
