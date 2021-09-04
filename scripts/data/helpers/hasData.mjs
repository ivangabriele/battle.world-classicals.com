import fs from 'fs'

export default function hasData(relativePath) {
  const filePath = new URL(`../../../data/${relativePath}`, import.meta.url)

  return fs.existsSync(filePath)
}
