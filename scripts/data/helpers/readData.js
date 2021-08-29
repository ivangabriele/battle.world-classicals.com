const { promises: fs } = require('fs')
const path = require('path')

module.exports = async function readData(relativePath, data, isPublic = false) {
  const dataRootPath = isPublic ? '../../../public/data' : '../../../data'

  const filePath = path.resolve(__dirname, dataRootPath, relativePath)
  const fileSource = await fs.readFile(filePath, 'utf-8')
  const fileData = JSON.parse(fileSource)

  return fileData
}
