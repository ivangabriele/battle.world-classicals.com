const fs = require('fs')
const path = require('path')
const prettier = require('prettier')

module.exports = function writeData(relativePath, data, isPublic = false) {
  const dataRootPath = isPublic ? '../../../public/data' : '../../../data'

  const filePath = path.resolve(__dirname, dataRootPath, relativePath)
  const fileSource = JSON.stringify(data)
  const fileSourceFormatted = prettier.format(fileSource, { parser: 'json' })

  fs.writeFileSync(filePath, fileSourceFormatted)
}
