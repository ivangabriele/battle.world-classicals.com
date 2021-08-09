const fetch = require('isomorphic-unfetch')

const normalizeLichessTournamentsList = require('../../../libs/helpers/normalizeLichessTournamentsList')
const waitFor = require('./waitFor')

module.exports = async function fetchLichess(path) {
  await waitFor(1)

  try {
    const res = await fetch(`https://lichess.org/api${path}`)
    const data = await res.json()

    if (data.error !== undefined) {
      throw new Error(`Fetched data with an error: ${data.error}`)
    }

    return data
  } catch (err) {
    if (err.type === 'invalid-json') {
      await waitFor(1)

      const res = await fetch(`https://lichess.org/api${path}`)
      const data = await res.text()

      return normalizeLichessTournamentsList(data)
    }

    throw err
  }
}
