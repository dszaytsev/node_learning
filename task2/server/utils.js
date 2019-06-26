exports.generateId = (() => {
  let id = 0

  return () => ++id
})()

exports.delay = ms => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), ms)
  })
}

exports.getUTCDate = () => new Date().toUTCString()
