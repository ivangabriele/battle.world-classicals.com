const PUBLIC_URL = process.env.PUBLIC_URL || 'http://localhost:3000'

const PATHS = ['/', '/journal', '/standings/all-time-players', '/standings/all-time-teams']

// https://github.com/pa11y/pa11y-ci#configuration
module.exports = {
  urls: PATHS.map(path => `${PUBLIC_URL}${path}`),
}
