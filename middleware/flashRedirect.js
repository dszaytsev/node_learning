module.exports = () => {
  return (req, res, next) => {
    res.flashRedirect = (path, ...flashArgs) => {
      req.flash(...flashArgs)
      res.redirect(path)
    }

    next()
  }
}
