const fs = require('fs')
const path = require('path')

module.exports = function hasData(relativePath) {
  const filePath = path.resolve(__dirname, '../../../data', relativePath)

  return fs.existsSync(filePath)
}
