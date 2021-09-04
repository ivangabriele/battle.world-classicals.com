import { promises as fs } from 'fs'

export default async function readData(relativePath, data, isPublic = false) {
  const dataRootPath = isPublic ? '../../../public/data' : '../../../data'

  const filePath = new URL(`${dataRootPath}/${relativePath}`, import.meta.url)
  const fileSource = await fs.readFile(filePath, 'utf-8')
  const fileData = JSON.parse(fileSource)

  return fileData
}
