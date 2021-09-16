const PUBLIC_URL = process.env.PUBLIC_URL || 'http://localhost:3000'

const PATHS = ['/journal', '/standings/all-time-players', '/standings/all-time-teams']

// https://github.com/pa11y/pa11y-ci#configuration
module.exports = {
  // https://github.com/pa11y/pa11y#configuration
  defaults: {
    // https://squizlabs.github.io/HTML_CodeSniffer/Standards/WCAG2/
    ignore: ['WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail'],
  },
  urls: PATHS.map(path => `${PUBLIC_URL}${path}`),
}
