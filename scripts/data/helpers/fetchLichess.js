const fromNdjson = require('from-ndjson')
const got = require('got')

const waitFor = require('./waitFor')

module.exports = async function fetchLichess(path) {
  await waitFor(1)

  try {
    const data = await got.get(`https://lichess.org/api${path}`).json()

    if (data.error !== undefined) {
      throw new Error(`Fetched data with an error: ${data.error}`)
    }

    return data
  } catch (err) {
    if (err.name === 'ParseError') {
      await waitFor(1)

      const data = await got.get(`https://lichess.org/api${path}`).text()

      return fromNdjson(data, { isStrict: true })
    }

    throw err
  }
}
