const { promises: fs } = require('fs')
const path = require('path')
const prettier = require('prettier')

module.exports = async function writeData(relativePath, data, isPublic = false) {
  const dataRootPath = isPublic ? '../../../public/data' : '../../../data'

  const filePath = path.resolve(__dirname, dataRootPath, relativePath)
  const fileSource = JSON.stringify(data)
  const fileSourceFormatted = prettier.format(fileSource, { parser: 'json' })

  await fs.writeFile(filePath, fileSourceFormatted)
}
