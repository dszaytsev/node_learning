

module.exports = () => {
  const [_, __, src, ...args] = process.argv
  const params = { remove: false, src }

  args.forEach((arg, index) => {
    if (arg === '-r') params.remove = true
    if (arg === '-o') params.path = args[index + 1]
  })

  return params
}
