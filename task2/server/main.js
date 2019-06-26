const http = require('http')
const minimist = require('minimist')
const { generateId, delay, getUTCDate } = require('./utils')

const PORT = 3000

const {
  interval: INTERVAL = 50,
  duration: DURATION = 5000
} = minimist(process.argv.slice(2))

const server = http.createServer(async (req, res) => {
  if (req.url === '/favicon.ico' || req.method !== 'GET') return

  const id = generateId()
  const stopTime = Date.now() + DURATION

  while (Date.now() < stopTime) {
    console.log(`User: ${id}; Datetime: ${getUTCDate()}`)
    await delay(INTERVAL)
  }

  res.end(`Current datetime: ${getUTCDate()}\n`)
})

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})
