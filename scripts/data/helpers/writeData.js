const fs = require('fs')
const path = require('path')
const prettier = require('prettier')

module.exports = function writeData(relativePath, data) {
  const filePath = path.resolve(__dirname, '../../../data', relativePath)
  const fileSource = JSON.stringify(data)
  const fileSourceFormatted = prettier.format(fileSource, { parser: 'json' })

  fs.writeFileSync(filePath, fileSourceFormatted)
}
