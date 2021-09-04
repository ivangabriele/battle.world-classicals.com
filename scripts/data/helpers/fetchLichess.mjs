import fromNdjson from 'from-ndjson'
import got from 'got'

import waitFor from './waitFor.mjs'

const DEFAULT_OPTIONS = {
  isNdjson: false,
  params: {},
}

export default async function fetchLichess(path, options = {}) {
  const finalOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
  }
  const { isNdjson, params } = finalOptions
  const parametersString = new URLSearchParams(params).toString()
  const queryString = parametersString !== '' ? `?${parametersString}` : ''
  const gotOptions = {}
  if (isNdjson) {
    gotOptions.headers = {
      Accept: 'application/x-ndjson',
    }
  }

  await waitFor(1)

  try {
    if (isNdjson) {
      const data = await got.get(`https://lichess.org/api${path}${queryString}`, gotOptions).text()

      return fromNdjson(data, { isStrict: true })
    }

    const data = await got.get(`https://lichess.org/api${path}${queryString}`, gotOptions).json()

    if (data.error !== undefined) {
      throw new Error(`Fetched data with an error: ${data.error}`)
    }

    return data
  } catch (err) {
    if (err.name === 'ParseError') {
      await waitFor(1)

      const data = await got.get(`https://lichess.org/api${path}${queryString}`, gotOptions).text()

      return fromNdjson(data, { isStrict: true })
    }

    throw err
  }
}
